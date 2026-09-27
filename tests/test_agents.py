import sys
import os
import unittest

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from agents.document.classifier import DocumentClassificationAgent
from agents.report.report_analysis import HealthcareReportAnalysisAgent
from agents.dicom.dicom_agent import DICOMMetadataAgent
from mcp.server import mcp_server_instance

class TestAgents(unittest.TestCase):
    def test_document_classification(self):
        result = DocumentClassificationAgent.classify("chest_ct_scan.txt", "Solitary 6mm nodule in right upper lobe.")
        self.assertEqual(result["document_type"], "radiology_report")
        self.assertEqual(result["modality"], "CT")

    def test_report_analysis_16_sections(self):
        meta = {"document_type": "radiology_report"}
        report = HealthcareReportAnalysisAgent.analyze("Solitary 6mm right upper lobe subpleural nodule on CT.", meta)
        
        # Verify all 16 standard sections exist
        required_keys = [
            "executive_summary", "patient_information", "examination", "clinical_indication",
            "findings", "measurements", "impression", "abnormal_findings", "normal_findings",
            "important_terminology", "potentially_important_statements",
            "questions_to_discuss_with_physician", "comparison_with_previous_reports",
            "evidence_citations", "uncertainty", "safety_notice"
        ]
        for key in required_keys:
            self.assertIn(key, report, f"Missing section: {key}")

    def test_mcp_tool_execution(self):
        res = mcp_server_instance.execute_tool("pubmed_search", {"search_term": "fleischner guidelines"})
        self.assertEqual(res.status, "SUCCESS")
        self.assertIn("results", res.data)

if __name__ == "__main__":
    unittest.main()
