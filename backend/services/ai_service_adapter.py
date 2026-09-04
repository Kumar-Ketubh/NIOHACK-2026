import sys
import json
import uuid
import os
from typing import List

TARGET_PATH = r"C:\Users\kumar\Downloads\project"
if TARGET_PATH not in sys.path:
    sys.path.insert(0, TARGET_PATH)

from schemas.translation import ClausePair


class AIServiceAdapter:
    def __init__(self):
        try:
            from pipeline import run_full_pipeline
            self._run_pipeline = run_full_pipeline
            self.has_real_ai = True
            print("[OK] Successfully loaded real AI pipeline from TARGET_PATH.")
        except Exception as e:
            print(f"[WARN] Could not load real AI pipeline. Using mock. Error: {e}")
            self._run_pipeline = None
            self.has_real_ai = False

    def process_document(self, file_path: str, output_dir: str):
        if self.has_real_ai:
            try:
                # Execute the actual external pipeline
                result = self._run_pipeline(
                    pdf_path=file_path,
                    output_dir=output_dir,
                )

                # Parse the generated translated JSON to send back to frontend
                translated_json_path = result.get("translated_json_path")
                clauses = []
                if translated_json_path and os.path.exists(translated_json_path):
                    with open(translated_json_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        for item in data:
                            original_text = (
                                item.get("original_text")
                                or item.get("full_text")
                                or item.get("text_preview", "")
                            )
                            translated_text = item.get("translated_hindi_text", "")
                            page = item.get("page", 1)

                            if translated_text:
                                clauses.append(
                                    ClausePair(
                                        id=str(uuid.uuid4()),
                                        original=original_text,
                                        translated=translated_text,
                                        page=page if page else 1,
                                    )
                                )

                return {
                    "status": "completed",
                    "pdf_path": result.get("pdf_path"),
                    "clauses": clauses,
                    "metadata": result,
                }
            except Exception as e:
                print(f"Pipeline failed: {e}")
                import traceback
                traceback.print_exc()
                raise
        else:
            print("Running in mock mode. Real pipeline unavailable.")
            return {
                "status": "completed",
                "pdf_path": None,
                "clauses": [
                    ClausePair(
                        id=str(uuid.uuid4()),
                        original="[Mock] Pipeline not loaded — check backend console for import errors.",
                        translated="[Mock] पाइपलाइन लोड नहीं हुई — आयात त्रुटियों के लिए बैकएंड कंसोल जांचें।",
                        page=1,
                    ),
                ],
                "metadata": {},
            }
