import sys
import os
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from mcp.server import mcp_server_instance

router = APIRouter()

class CompareRequest(BaseModel):
    report_a_id: str = "report_2025_chest.txt"
    report_b_id: str = "report_2026_ct_chest.txt"

@router.post("/compare")
async def compare_reports(request: CompareRequest):
    """
    POST /compare
    Side-by-side diff engine for Report A vs Report B.
    Extracts changed findings, unchanged findings, new findings, dropped findings, and measurement shifts.
    Does NOT declare ungrounded clinical significance without explicit guideline support.
    """
    mcp_res = mcp_server_instance.execute_tool(
        "report_comparison",
        {"report_a_id": request.report_a_id, "report_b_id": request.report_b_id}
    )

    return {
        "status": "SUCCESS",
        "comparison": mcp_res.data,
        "safety_disclaimer": "Comparison identifies textual and quantitative differences documented between reports. Clinical evaluation by a physician is required to determine diagnostic significance."
    }
