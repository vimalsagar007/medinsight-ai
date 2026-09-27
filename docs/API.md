# MedInsight AI REST API Reference

## Endpoints Summary

### 1. File Upload
- `POST /api/upload`: Generates GCS signed upload URL, computes checksums, creates tracking metadata.
- `GET /api/files/{id}`: Retrieves upload processing status and document type classification.

### 2. Report Analysis & Summarization
- `POST /api/analyze`: Invokes `HealthcareReportAnalysisAgent` to extract structured 16-section report JSON.

### 3. Conversational Assistant & Streaming
- `POST /api/chat`: Streams conversational answers from `HealthcareOrchestratorAgent` on Gemini Agent Runtime. Includes inline citation cards and grounding status metrics.

### 4. Longitudinal Report Comparison
- `POST /api/compare`: Runs diff engine comparing Report A vs Report B findings and measurement shifts over time.

### 5. Citations & Grounding
- `GET /api/citations/{id}`: Resolves PubMed literature links, journal citations, and evidence snippets.

### 6. Session Memory Management
- `GET /api/session/{id}`: Retrieves active session documents and message history.
- `DELETE /api/session/{id}`: Purges session history and temporary files.

### 7. Evaluation Benchmark Suite
- `POST /api/eval`: Executes benchmark suite over synthetic golden test datasets.
