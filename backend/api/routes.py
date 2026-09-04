from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response, FileResponse
from schemas.translation import TranslationResponse, ExportPDFRequest
from services.ai_service_adapter import AIServiceAdapter
import tempfile
import shutil
import os

router = APIRouter()
ai_service = AIServiceAdapter()

@router.post("/translate", response_model=TranslationResponse)
async def translate_document(
    file: UploadFile = File(...),
    source_lang: str = Form("English"),
    target_lang: str = Form("Hindi")
):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
        
    try:
        # Save the uploaded file to a temporary directory so the pipeline can read it
        temp_dir = tempfile.mkdtemp()
        pdf_path = os.path.join(temp_dir, file.filename)
        
        with open(pdf_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Define output directory for the pipeline
        output_dir = os.path.join(temp_dir, "output")
        
        # Execute the AI pipeline
        result = ai_service.process_document(file_path=pdf_path, output_dir=output_dir)
        
        # Returning the parsed clauses for the UI ResultViewer
        return TranslationResponse(
            clauses=result.get("clauses", []),
            status="completed"
        )
        
    except Exception as e:
        print(f"Error during translation: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/export/pdf")
async def export_pdf(request: ExportPDFRequest):
    """
    For the MVP, since the pipeline already generates a PDF internally on the Desktop/temp dir,
    we can use our existing HTML-to-PDF service as a fallback if needed, or you can later 
    wire this to fetch the actual pipeline-generated PDF.
    """
    from services.pdf_render_service import PDFRenderService
    try:
        pdf_bytes = PDFRenderService.render_to_pdf(request.clauses, request.title)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=translated_document.pdf"
            }
        )
    except Exception as e:
        print(f"Error generating PDF: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate PDF")
