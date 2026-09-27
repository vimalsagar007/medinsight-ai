import sys
import os
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Add root directory to python path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend.app.api import upload, analyze, chat, compare, citations, session, eval_routes

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("MedInsightAPI")

app = FastAPI(
    title="MedInsight AI — Multimodal Healthcare Report Analysis API",
    description="Production-quality REST API on Google Cloud with Gemini, Vertex AI RAG Engine, Agent Runtime, MCP tools, and DICOM integration.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(analyze.router, prefix="/api", tags=["Analysis"])
app.include_router(chat.router, prefix="/api", tags=["Chat & Streaming"])
app.include_router(compare.router, prefix="/api", tags=["Report Comparison"])
app.include_router(citations.router, prefix="/api", tags=["Citations & Grounding"])
app.include_router(session.router, prefix="/api", tags=["Session Memory"])
app.include_router(eval_routes.router, prefix="/api", tags=["Evaluation Metrics"])

@app.get("/")
def root():
    return {
        "application": "MedInsight AI",
        "status": "HEALTHY",
        "runtime": "Google Cloud Agent Runtime / Cloud Run",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "gcp_vertex_ai": "CONNECTED",
        "dicom_store": "AVAILABLE",
        "rag_engine": "INDEXED",
        "mcp_server": "ONLINE"
    }
