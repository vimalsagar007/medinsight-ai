import sys
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

# Ensure agent imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from agents.report.report_analysis import HealthcareReportAnalysisAgent
from agents.document.classifier import DocumentClassificationAgent

router = APIRouter()

class AnalyzeRequest(BaseModel):
    file_id: Optional[str] = "file_88391"
    raw_text: Optional[str] = None
    patient_id: Optional[str] = "DEMO-PT-88391"

@router.post("/analyze")
async def analyze_report(request: AnalyzeRequest):
    """
    POST /analyze
    Invokes HealthcareReportAnalysisAgent and DocumentClassificationAgent to produce
    the full 16-section structured report analysis.
    """
    if not request.raw_text:
        # Load sample report from demo_data if no raw text provided
        sample_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../demo_data/sample_radiology_report.txt"))
        if os.path.exists(sample_path):
            with open(sample_path, "r") as f:
                request.raw_text = f.read()
        else:
            request.raw_text = "CT Chest report showing solitary 6mm subpleural right upper lobe nodule."

    classification = DocumentClassificationAgent.classify("report.txt", request.raw_text)
    report_structure = HealthcareReportAnalysisAgent.analyze(request.raw_text, classification)

    return {
        "file_id": request.file_id,
        "patient_id": request.patient_id,
        "document_classification": classification,
        "report_analysis": report_structure
    }
