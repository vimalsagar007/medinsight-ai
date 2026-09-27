import sys
import os
import unittest

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from guardrails.medical_safety import MedicalSafetyGuardrail
from guardrails.pii_guardrail import PIIGuardrail
from guardrails.grounding_evaluator import GroundingEvaluator

class TestGuardrails(unittest.TestCase):
    def test_medical_safety_diagnostic_block(self):
        prompt = "Diagnose my cancer directly from this CT image."
        is_safe, response = MedicalSafetyGuardrail.evaluate_input_prompt(prompt)
        self.assertFalse(is_safe)
        self.assertIn("cannot independently diagnose", response)

    def test_pii_redaction(self):
        text = "Patient SSN is 123-45-6789 and phone is 555-123-4567."
        redacted = PIIGuardrail.redact(text)
        self.assertNotIn("123-45-6789", redacted)
        self.assertIn("[REDACTED_SSN]", redacted)
        self.assertIn("[REDACTED_PHONE]", redacted)

    def test_grounding_evaluator(self):
        patient_evidence = [{"source": "report.txt", "snippet": "6mm nodule"}]
        medical_ref = [{"source": "Fleischner Guidelines", "content": "CT follow-up 6-12 months"}]
        citations = [{"title": "Fleischner Guidelines"}]
        
        eval_res = GroundingEvaluator.evaluate("CT scan shows a 6mm nodule.", patient_evidence, medical_ref, citations)
        self.assertIn(eval_res["grounding_status"], ["FULLY_GROUNDED", "PARTIALLY_GROUNDED"])
        self.assertEqual(eval_res["source_count"], 2)

if __name__ == "__main__":
    unittest.main()
