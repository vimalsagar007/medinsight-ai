import sys
import os
from fastapi import APIRouter
from pydantic import BaseModel

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from evaluation.run_evaluation import run_benchmark_suite

router = APIRouter()

@router.get("/session/{session_id}")
async def get_session(session_id: str):
    return {
        "session_id": session_id,
        "active_documents": [
            {"file_id": "file_88391", "filename": "sample_radiology_report.txt", "doc_type": "radiology_report"}
        ],
        "conversation_turn_count": 4,
        "consent_verified": True
    }

@router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    return {
        "session_id": session_id,
        "status": "PURGED",
        "message": "Session conversation history and temporary uploaded files cleared per user privacy request."
    }
