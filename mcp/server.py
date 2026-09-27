import json
import logging
import time
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, ValidationError

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("MedInsightMCP")

class MCPToolResponse(BaseModel):
    tool_name: str
    status: str  # "SUCCESS", "ERROR", "RATE_LIMITED", "TIMEOUT"
    execution_time_ms: float
    data: Dict[str, Any]
    audit_log_id: str

class MedicalDocumentSearchInput(BaseModel):
    query: str = Field(..., description="Keywords or clinical query to search in uploaded documents.")
    patient_id: str = Field(..., description="Sanitized patient ID or session ID.")
    document_types: Optional[List[str]] = Field(default=None, description="Filter by document type (e.g., radiology_report, blood_report)")

class PubMedSearchInput(BaseModel):
    search_term: str = Field(..., description="Medical topic, condition, or guideline query")
    max_results: int = Field(default=5, ge=1, le=20)

class DICOMMetadataInput(BaseModel):
    sop_instance_uid: Optional[str] = None
    patient_id: str = Field(..., description="De-identified patient ID")

class ReportComparisonInput(BaseModel):
    report_a_id: str = Field(..., description="Base report file ID")
    report_b_id: str = Field(..., description="Comparison report file ID")

class MCPServer:
    """
    Model Context Protocol (MCP) Server for MedInsight AI
    Provides secure, rate-limited, validated tools for multi-agent execution.
    """
    
    def __init__(self):
        self.request_counts: Dict[str, int] = {}
        self.rate_limit_per_min = 60

    def _check_rate_limit(self, tool_name: str) -> bool:
        current_minute = int(time.time() / 60)
        key = f"{tool_name}:{current_minute}"
        count = self.request_counts.get(key, 0)
        if count >= self.rate_limit_per_min:
            return False
        self.request_counts[key] = count + 1
        return True

    def execute_tool(self, tool_name: str, payload: Dict[str, Any]) -> MCPToolResponse:
        start_time = time.time()
        audit_id = f"AUDIT-{int(time.time() * 1000)}"

        if not self._check_rate_limit(tool_name):
            return MCPToolResponse(
                tool_name=tool_name,
                status="RATE_LIMITED",
                execution_time_ms=0.0,
                data={"error": "Rate limit exceeded. Please try again in 1 minute."},
                audit_log_id=audit_id
            )

        try:
            logger.info(f"[{audit_id}] Executing MCP tool '{tool_name}' with payload: {payload}")
            
            if tool_name == "medical_document_search":
                inputs = MedicalDocumentSearchInput(**payload)
                result = self._medical_document_search(inputs)
            elif tool_name == "patient_report_search":
                result = self._patient_report_search(payload)
            elif tool_name == "medical_reference_search":
                result = self._medical_reference_search(payload)
            elif tool_name == "pubmed_search":
                inputs = PubMedSearchInput(**payload)
                result = self._pubmed_search(inputs)
            elif tool_name == "dicom_metadata":
                inputs = DICOMMetadataInput(**payload)
                result = self._dicom_metadata(inputs)
            elif tool_name == "fhir_patient_lookup":
                result = self._fhir_patient_lookup(payload)
            elif tool_name == "lab_result_lookup":
                result = self._lab_result_lookup(payload)
            elif tool_name == "medication_lookup":
                result = self._medication_lookup(payload)
            elif tool_name == "previous_report_lookup":
                result = self._previous_report_lookup(payload)
            elif tool_name == "report_comparison":
                inputs = ReportComparisonInput(**payload)
                result = self._report_comparison(inputs)
            elif tool_name == "citation_lookup":
                result = self._citation_lookup(payload)
            elif tool_name == "file_metadata":
                result = self._file_metadata(payload)
            elif tool_name == "session_history":
                result = self._session_history(payload)
            else:
                raise ValueError(f"Unknown MCP tool: {tool_name}")

            elapsed = round((time.time() - start_time) * 1000, 2)
            return MCPToolResponse(
                tool_name=tool_name,
                status="SUCCESS",
                execution_time_ms=elapsed,
                data=result,
                audit_log_id=audit_id
            )

        except ValidationError as ve:
            return MCPToolResponse(
                tool_name=tool_name,
                status="ERROR",
                execution_time_ms=round((time.time() - start_time) * 1000, 2),
                data={"error": f"Input validation failed: {str(ve)}"},
                audit_log_id=audit_id
            )
        except Exception as e:
            logger.error(f"[{audit_id}] MCP tool error: {str(e)}")
            return MCPToolResponse(
                tool_name=tool_name,
                status="ERROR",
                execution_time_ms=round((time.time() - start_time) * 1000, 2),
                data={"error": str(e)},
                audit_log_id=audit_id
            )

    # Individual MCP Tool Implementation Mock Stubs (GCP integrated)
    def _medical_document_search(self, inputs: MedicalDocumentSearchInput) -> Dict[str, Any]:
        return {
            "query": inputs.query,
            "patient_id": inputs.patient_id,
            "matches": [
                {
                    "file_id": "file_88391_ct_chest.txt",
                    "document_type": "radiology_report",
                    "snippet": "Solitary 6mm subpleural nodule in right upper lobe. Recommend follow-up low-dose CT in 6-12 months.",
                    "score": 0.94
                }
            ]
        }

    def _patient_report_search(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {"reports": ["sample_radiology_report.txt", "sample_blood_lab_report.json"]}

    def _medical_reference_search(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "reference": "Fleischner Society Guidelines for Management of Solid Nodules",
            "recommendation": "For solitary non-calcified solid nodule < 6 mm in low-risk patient: optional CT at 12 months. In high-risk or 6-8mm: CT at 6-12 months.",
            "source_url": "https://pubmed.ncbi.nlm.nih.gov/28240563/",
            "pub_date": "2017"
        }

    def _pubmed_search(self, inputs: PubMedSearchInput) -> Dict[str, Any]:
        return {
            "query": inputs.search_term,
            "results": [
                {
                    "pmid": "28240563",
                    "title": "Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017",
                    "journal": "Radiology",
                    "year": "2017",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/28240563/",
                    "abstract": "Updated guidelines for incidental solid and subsolid pulmonary nodules detected on CT scans."
                }
            ]
        }

    def _dicom_metadata(self, inputs: DICOMMetadataInput) -> Dict[str, Any]:
        return {
            "modality": "CT",
            "body_part": "CHEST",
            "slice_thickness_mm": 2.5,
            "study_date": "2026-08-14",
            "accession_number": "ACC-2026-88391",
            "deidentified_patient_id": inputs.patient_id
        }

    def _fhir_patient_lookup(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "resourceType": "Patient",
            "id": payload.get("patient_id", "DEMO-PT-88391"),
            "gender": "female",
            "birthDate": "1972-04-11",
            "active": True
        }

    def _lab_result_lookup(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "glucose": "118 mg/dL (HIGH)",
            "hba1c": "5.9 % (HIGH - Prediabetes threshold)",
            "hemoglobin": "13.8 g/dL (NORMAL)"
        }

    def _medication_lookup(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {"active_medications": ["Multivitamin daily", "Atorvastatin 10mg daily"]}

    def _previous_report_lookup(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {"previous_reports": [{"date": "2025-05-10", "type": "Chest X-Ray", "summary": "Clear lungs, no nodules noted."}]}

    def _report_comparison(self, inputs: ReportComparisonInput) -> Dict[str, Any]:
        return {
            "base_report": inputs.report_a_id,
            "compared_report": inputs.report_b_id,
            "new_findings": ["6mm subpleural right upper lobe nodule on CT (2026-08-14)"],
            "unchanged_findings": ["Normal heart size, normal bone structures"],
            "measurement_changes": ["Right upper lobe nodule: new appearance, 6mm"],
            "explicit_uncertainty": "Clinical significance requires 6-12 month follow-up CT scan per Fleischner Society guidelines."
        }

    def _citation_lookup(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "citation_id": payload.get("citation_id", "CIT-1"),
            "title": "Fleischner Society Guidelines 2017",
            "publisher": "Radiological Society of North America (RSNA)",
            "url": "https://pubmed.ncbi.nlm.nih.gov/28240563/"
        }

    def _file_metadata(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "file_id": payload.get("file_id", "file_88391"),
            "mime_type": "application/pdf",
            "status": "INDEXED_RAG",
            "checksum": "a8f5f167f44f4964e6c998dee827110c",
            "upload_timestamp": "2026-08-14T10:30:00Z"
        }

    def _session_history(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        return {"session_id": payload.get("session_id", "sess_demo"), "message_count": 4}

mcp_server_instance = MCPServer()
