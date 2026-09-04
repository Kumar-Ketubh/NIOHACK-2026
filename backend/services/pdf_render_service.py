import io
from xhtml2pdf import pisa
from jinja2 import Template
from schemas.translation import ClausePair
from typing import List
from pathlib import Path

class PDFRenderService:
    @staticmethod
    def render_to_pdf(clauses: List[ClausePair], title: str = "Translated Legal Document") -> bytes:
        template_path = Path(__file__).parent.parent / "templates" / "legal_document.html"
        
        if not template_path.exists():
            html_content = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Helvetica, sans-serif; font-size: 12pt; line-height: 1.5; }}
                    h1 {{ text-align: center; font-size: 16pt; }}
                    .clause-container {{ margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }}
                    .original {{ font-size: 10pt; color: #555; font-style: italic; margin-bottom: 5px; }}
                    .translated {{ font-size: 12pt; color: #000; }}
                </style>
            </head>
            <body>
                <h1>{title}</h1>
                {% for clause in clauses %}
                <div class="clause-container">
                    <div class="original">{{ clause.original }}</div>
                    <div class="translated">{{ clause.translated }}</div>
                </div>
                {% endfor %}
            </body>
            </html>
            """
        else:
            html_content = template_path.read_text(encoding="utf-8")
            
        template = Template(html_content)
        rendered_html = template.render(clauses=clauses, title=title)
        
        pdf_file = io.BytesIO()
        pisa_status = pisa.CreatePDF(io.StringIO(rendered_html), dest=pdf_file)
        
        if pisa_status.err:
            raise RuntimeError("PDF rendering failed")
            
        return pdf_file.getvalue()
