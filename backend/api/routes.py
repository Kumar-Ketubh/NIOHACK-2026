from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from schemas.translation import TranslationResponse
from services.ai_service_adapter import AIServiceAdapter
import tempfile
import shutil
import os
import uuid

router = APIRouter()
ai_service = AIServiceAdapter()

# In-memory store: download_id -> file path on disk
_pdf_store: dict[str, str] = {}


@router.post("/translate", response_model=TranslationResponse)
async def translate_document(
    file: UploadFile = File(...),
    source_lang: str = Form("English"),
    target_lang: str = Form("Hindi"),
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    try:
        # Save uploaded file to a temp directory the pipeline can read from
        temp_dir = tempfile.mkdtemp()
        pdf_path = os.path.join(temp_dir, file.filename)

        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Output directory for pipeline artifacts
        output_dir = os.path.join(temp_dir, "output")

        # Execute the AI pipeline
        result = ai_service.process_document(file_path=pdf_path, output_dir=output_dir)

        # Store generated PDF path for later download
        download_id = None
        generated_pdf = result.get("pdf_path")
        if generated_pdf and os.path.exists(str(generated_pdf)):
            download_id = str(uuid.uuid4())
            _pdf_store[download_id] = str(generated_pdf)

        return TranslationResponse(
            clauses=result.get("clauses", []),
            status="completed",
            pdf_download_id=download_id,
        )

    except Exception as e:
        print(f"Error during translation: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{download_id}")
async def download_pdf(download_id: str):
    """Serve the pipeline-generated translated PDF for download."""
    pdf_path = _pdf_store.get(download_id)
    if not pdf_path or not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found or expired")

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename="translated_document.pdf",
    )
