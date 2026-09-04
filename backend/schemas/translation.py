from pydantic import BaseModel
from typing import List

class ClausePair(BaseModel):
    id: str
    original: str
    translated: str
    page: int = 1

class TranslationResponse(BaseModel):
    clauses: List[ClausePair]
    status: str

class ExportPDFRequest(BaseModel):
    clauses: List[ClausePair]
    title: str = "Translated Legal Document"
