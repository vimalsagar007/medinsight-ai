# MedInsight AI Architecture Specification

## 1. System Overview
MedInsight AI uses a decoupled, event-driven multi-agent architecture built on Google Cloud. The primary orchestration layer runs on **Gemini Enterprise Agent Runtime** and coordinates specialized sub-agents through Agent-to-Agent (A2A) protocols.

## 2. Ingestion & Storage Pipeline
1. **Client Browser**: Requests short-lived signed upload URL from FastAPI backend (`/api/upload`).
2. **Cloud Storage (GCS)**: Raw file uploaded directly to `medinsight-raw-uploads-prod` via TLS.
3. **Pub/Sub Notification**: GCS emits `OBJECT_FINALIZE` event to `medical-file-ingested-topic`.
4. **Ingestion Worker**:
   - Computes SHA-256 checksum and extracts file metadata.
   - For DICOM (.dcm): Stores instances in Cloud Healthcare API DICOM Store (`medinsight_dicom_store`) and extracts de-identified headers.
   - For PDFs/Documents: Runs OCR/text extraction and indexes snippets into Vertex AI RAG Engine across 3 partitioned knowledge namespaces.

## 3. Partitioned RAG Namespaces
- `PATIENT_CONTEXT`: Uploaded patient reports, lab JSON, DICOM metadata, video transcripts.
- `MEDICAL_KNOWLEDGE`: Hospital-approved guidelines, clinical decision support (e.g., Fleischner Society 2017 Guidelines).
- `PUBLIC_WEB_KNOWLEDGE`: PubMed PMID references, peer-reviewed medical literature.

## 4. Model Context Protocol (MCP) Tools
The MCP server exposes 13 tools with strict JSON Schema validation:
1. `medical_document_search`
2. `patient_report_search`
3. `medical_reference_search`
4. `pubmed_search`
5. `dicom_metadata`
6. `fhir_patient_lookup`
7. `lab_result_lookup`
8. `medication_lookup`
9. `previous_report_lookup`
10. `report_comparison`
11. `citation_lookup`
12. `file_metadata`
13. `session_history`
