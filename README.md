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

## 🧪 How to Test This Application

You can test MedInsight AI instantly via the live Google Cloud Run deployment or locally on your workstation:

### Option 1: Live Cloud Testing (Instant — No Installation Needed)
The backend is deployed live on Google Cloud Agent Runtime / Cloud Run:
- **Interactive Swagger UI**: 👉 **[https://medinsight-backend-61256100941.us-central1.run.app/docs](https://medinsight-backend-61256100941.us-central1.run.app/docs)**

#### Quick Terminal Verification (`curl`):
1. **Check Live Health & Cloud Services**:
   ```bash
   curl -s https://medinsight-backend-61256100941.us-central1.run.app/health
   ```
2. **Test Healthcare AI Agent Query**:
   ```bash
   curl -s -X POST https://medinsight-backend-61256100941.us-central1.run.app/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What are the key findings in the chest CT report?", "session_id": "TEST-101"}'
   ```

---

### Option 2: Test Locally (Frontend Web App + Backend)
1. **Start Backend Server**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python3 -m uvicorn app.main:app --reload --port 8080
   ```
2. **Start Frontend Web Application**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser. Upload sample files from `demo_data/` to test report analysis, side-by-side comparison, and chat.

---

### Option 3: Run Automated Test & Evaluation Suite
```bash
# 1. Run Unit Tests (Guardrails, Redaction, MCP Tools, Agents)
python3 -m unittest discover -s tests

# 2. Run Quality Flywheel Evaluation Suite
python3 evaluation/run_evaluation.py
```

---

### 📂 Sample Files for Testing
Sample files are provided in the [`demo_data/`](demo_data/) directory:
- `demo_radiology_report.txt`: Sample chest CT report.
- `demo_lab_results.json`: Sample blood panel (HbA1c, glucose, lipid panel).
- `demo_dicom_metadata.json`: DICOM metadata headers.

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
