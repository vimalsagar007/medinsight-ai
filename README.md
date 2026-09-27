# MedInsight AI — Multimodal Healthcare Report & Medical Media Analysis Assistant

> **"Understand your healthcare reports and medical records with grounded AI assistance."**

MedInsight AI is an enterprise-grade multimodal healthcare report analysis platform built on **Google Cloud Platform (GCP)** using **Gemini**, **Google Cloud Agent Runtime**, **Vertex AI RAG Engine**, **Model Context Protocol (MCP)**, **Agent-to-Agent (A2A)** multi-agent orchestration, and secure cloud-native services.

---

## ⚠️ Important Medical Safety Disclaimer

> [!IMPORTANT]
> MedInsight AI provides document-grounded summarization, medical terminology explanations, metadata extraction, and educational guidance.
> **MedInsight AI does NOT independently diagnose medical images (CT scans, X-rays, MRIs, Ultrasound, PET scans) or formulate clinical treatment plans.**
> All medical image evaluations and healthcare decisions require consultation with a qualified, licensed physician.

---

## Key Features

- **14+ Multimodal Formats Supported**: PDF, DICOM (.dcm), JPG, PNG, WEBP, MP4, MOV, AVI, WAV, MP3, TXT, DOCX, PPTX, JSON, CSV.
- **A2A Multi-Agent Architecture**: `HealthcareOrchestratorAgent` directing 10 specialized sub-agents (`DocumentAgent`, `ReportAnalysisAgent`, `DICOMMetadataAgent`, `VideoAnalysisAgent`, `RAGAgent`, `MedicalReferenceAgent`, `CitationAgent`, `SafetyGuardrailAgent`, `PatientContextAgent`, `SummaryAgent`).
- **16-Point Report Extraction**: Standardized extraction across 16 medical report sections (Executive summary, Patient info, Examination, Indication, Findings, Measurements, Impression, Abnormal findings, Normal findings, Terminology, Important statements, Questions for physician, Comparison, Citations, Uncertainty, Safety notice).
- **Longitudinal Report Comparison**: Report A vs Report B side-by-side diffing for tracking findings and measurement shifts across time.
- **Grounding & Evidence Provenance**: Partitioned RAG knowledge namespaces (`PATIENT_CONTEXT`, `MEDICAL_KNOWLEDGE`, `PUBLIC_WEB_KNOWLEDGE`). Includes an interactive **"Show Evidence"** button to view exact snippet provenance.
- **Model Context Protocol (MCP)**: 13 strict-schema MCP tools with rate-limiting, audit logging, and input validation.
- **HIPAA-Ready Architecture**: GCS short-lived signed URLs, PII/PHI redaction guardrails, Cloud Healthcare API DICOM store integration, Secret Manager, Cloud KMS, and Cloud Trace observability.

---

## Technical Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             Next.js Frontend (Cloud Run)                         │
│   Dark Cinematic Medical Tech UI | Streaming Chat | Glassmorphism | Audio/Video │
└────────────────                        ┬─────────────────────────────────────────┘
                                         │ HTTPS / REST / SSE
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            FastAPI Backend Gateway (Cloud Run)                   │
│  /upload, /files, /analyze, /chat, /compare, /citations, /session, /health, /eval │
└───────────┬────────────────────────────┬─────────────────────────────┬───────────┘
            │                            │                             │
            ▼                            ▼                             ▼
┌─────────────────────────┐  ┌───────────────────────┐   ┌─────────────────────────┐
│ Cloud Storage (GCS)     │  │ Pub/Sub & Worker      │   │ Vertex AI RAG Engine    │
│ Signed Upload URLs      │  │ Ingestion & Parsing   │   │ Knowledge Namespaces:   │
│ Raw vs Extracted Bucket │  │ Classification Agent │   │ • PATIENT_CONTEXT       │
└─────────────────────────┘  └───────────────────────┘   │ • MEDICAL_KNOWLEDGE     │
                                                         │ • PUBLIC_WEB_KNOWLEDGE  │
                                                         └─────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│             Gemini Agent Runtime - HealthcareOrchestratorAgent (A2A)            │
│  • DocumentAgent          • ReportAnalysisAgent   • DICOMMetadataAgent            │
│  • VideoAnalysisAgent     • RAGAgent              • MedicalReferenceAgent         │
│  • SafetyGuardrailAgent   • PatientContextAgent   • CitationAgent                 │
│  • SummaryAgent                                                                  │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │ MCP Tools Interface
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                               Model Context Protocol (MCP)                       │
│  • medical_document_search  • patient_report_search  • medical_reference_search  │
│  • pubmed_search           • dicom_metadata        • fhir_patient_lookup      │
│  • lab_result_lookup       • medication_lookup     • report_comparison        │
│  • citation_lookup         • session_history                                  │
└────────────────────────────────────────┬─────────────────────────────────────────┘
                                         │
                                         ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                     Google Cloud Healthcare API & Storage Services               │
│  • DICOM Store (Metadata & Instances)   • FHIR Store (Ready Schema Integration)  │
│  • Secret Manager & Cloud KMS           • Cloud Logging / Monitoring / Trace     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start (Local Development)

### 1. Prerequisites
- Python 3.11+
- Node.js 18+ & npm
- Google Cloud SDK (`gcloud`)

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Running Tests & Evaluation Suite
```bash
pytest tests/
python evaluation/run_evaluation.py
```

---

## Documentation Index

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Security & HIPAA Compliance](docs/SECURITY.md)
- [Deployment & Terraform Guide](docs/DEPLOYMENT.md)
- [Evaluation & Benchmarks Report](docs/EVALUATION.md)
- [API Reference](docs/API.md)
