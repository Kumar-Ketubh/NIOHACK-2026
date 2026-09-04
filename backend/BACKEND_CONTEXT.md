# Legality Backend Context

## 1. Extracted Signatures & Models from Target AI Service
- `pipeline.py`: Full extraction pipeline including PDF to Markdown, geometric chunking, translation, and PDF recreation.
- `llm_pipeline.py` & `llm.py`: Translation pipelines leveraging Gemini API for English to Hindi translation of legal text with layout preservation.
- `image_extraction.py`, `pdf_with_image.py`: Handles images.
- `convert_to_pdf.py`: Creates PDF back from translated JSON.
- **Constraints**: We are rewriting this as a single-process API without external infra (no Redis/Celery/S3) using `io.BytesIO`.

## 2. Data Contracts
- `ClausePair`: Original text and translated text.
- `TranslationResponse`: Result containing lists of clause pairs and translation status.
- `ExportPDFRequest`: Request to export the translated document to PDF.

## 3. Active Status
- `main.py`: FastAPI application entrypoint. (Pending)
- `api/routes.py`: API endpoints for upload, status, and PDF download. (Pending)
- `services/parser_service.py`: In-memory PDF text extraction. (Pending)
- `services/ai_service_adapter.py`: Wrapper around existing AI logic with structured mock fallback. (Pending)
- `services/pdf_render_service.py`: HTML -> PDF legal renderer via `xhtml2pdf`. (Pending)
