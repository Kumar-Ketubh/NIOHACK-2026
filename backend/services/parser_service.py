import io
from PyPDF2 import PdfReader

class ParserService:
    @staticmethod
    def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> list[str]:
        """
        Extracts text from PDF bytes in-memory and splits it into logical clauses/paragraphs.
        """
        pdf_file = io.BytesIO(pdf_bytes)
        reader = PdfReader(pdf_file)
        
        clauses = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                # Simple split by double newline or single newline for clauses
                paragraphs = text.split('\n\n')
                for p in paragraphs:
                    cleaned = p.strip().replace('\n', ' ')
                    if cleaned:
                        clauses.append(cleaned)
        
        # If no double newlines, fallback to sentence or line splitting
        if len(clauses) < 2 and clauses:
            clauses = [c.strip() for c in clauses[0].split('.') if c.strip()]
            
        return clauses
