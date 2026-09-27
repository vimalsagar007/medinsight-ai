# Security & HIPAA Compliance Architecture

## 1. PHI / PII Redaction & Sanitization
- All raw patient identifiers (SSN, Phone, Email, MRN) are scrubbed before sending prompts to LLM models or logging.
- De-identified patient IDs are generated using salted hash tokens (`ANON-PT-88391`).

## 2. Encryption at Rest & In Transit
- **In Transit**: All HTTP communications enforced via TLS 1.3.
- **At Rest**: Cloud Storage objects, DICOM Store instances, and Firestore session stores encrypted using Cloud KMS Customer-Managed Encryption Keys (CMEK).

## 3. IAM & Access Control
- Cloud Run containers execute under dedicated service accounts (`medinsight-app-sa`) with least privilege.
- No GCS storage service account keys are exposed to client browser applications. Uploads use short-lived signed URLs (15-minute expiration).

## 4. Audit Logging & Observability
- All API requests, MCP tool executions, and agent decisions emit structured JSON logs to Cloud Logging.
- Cloud Trace tracks distributed request spans across Gateway -> Agent Runtime -> Vertex AI RAG -> MCP tools.
