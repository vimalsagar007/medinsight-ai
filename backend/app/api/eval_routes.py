import sys
import os
from fastapi import APIRouter

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../..")))
from evaluation.run_evaluation import run_benchmark_suite

router = APIRouter()

@router.post("/eval")
async def execute_evaluation():
    """POST /eval - Executes benchmark evaluation suite across synthetic golden test datasets."""
    results = run_benchmark_suite()
    return results
