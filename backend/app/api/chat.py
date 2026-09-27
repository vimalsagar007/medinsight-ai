import sys
import os
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from agents.orchestrator.orchestrator import HealthcareOrchestratorAgent

router = APIRouter()
orchestrator = HealthcareOrchestratorAgent()

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "sess_demo"
    patient_id: Optional[str] = "DEMO-PT-88391"
    uploaded_files: Optional[List[Dict[str, Any]]] = None

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    POST /chat
    Conversational endpoint connected to HealthcareOrchestratorAgent on Gemini Agent Runtime.
    Filters queries through safety guardrails and attaches citations and grounding meters.
    """
    files = request.uploaded_files or [
        {
            "filename": "sample_radiology_report.txt",
            "snippet": "CT Chest scan showing solitary 6mm right upper lobe subpleural nodule. Follow-up low-dose CT in 6-12 months per Fleischner guidelines.",
            "mime_type": "text/plain"
        }
    ]

    result = orchestrator.process_request(
        user_prompt=request.message,
        session_id=request.session_id,
        uploaded_files=files
    )

    return result
