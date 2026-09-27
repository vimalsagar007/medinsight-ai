import re
from typing import Dict, Any, Tuple

class MedicalSafetyGuardrail:
    """
    Medical Safety Guardrail
    Enforces non-diagnostic compliance:
    - Blocks requests demanding direct AI clinical diagnosis of medical images.
    - Appends mandatory physician review disclaimers.
    - Ensures non-diagnostic terminology is used when summarizing radiology/imaging media.
    """
    
    DIAGNOSTIC_KEYWORDS = [
        r"diagnose\s+my",
        r"tell\s+me\s+if\s+i\s+have\s+cancer",
        r"is\s+this\s+tumor\s+malignant",
        r"read\s+this\s+x-?ray\s+to\s+diagnose",
        r"interpret\s+this\s+ct\s+scan\s+clinically",
        r"is\s+my\s+mri\s+cancerous",
        r"confirm\s+if\s+i\s+have\s+a\s+disease"
    ]

    REQUIRED_DISCLAIMER = (
        "\n\n---\n"
        "**MEDICAL SAFETY NOTICE**: MedInsight AI provides document-grounded explanations, "
        "metadata extraction, and educational guidance. It does NOT generate independent medical "
        "diagnoses or interpret radiological imaging. Medical images, CT scans, X-rays, and MRIs "
        "must be reviewed and clinically evaluated by a licensed, qualified healthcare professional."
    )

    @classmethod
    def evaluate_input_prompt(cls, prompt: str) -> Tuple[bool, str]:
        """
        Check if user input is asking for an independent medical diagnosis.
        Returns (is_safe, response_if_unsafe)
        """
        prompt_lower = prompt.lower()
        for pattern in cls.DIAGNOSTIC_KEYWORDS:
            if re.search(pattern, prompt_lower):
                return False, (
                    "I can explain the information documented in your written medical report, "
                    "extract metadata, and help you prepare questions for your physician, but "
                    "I cannot independently diagnose medical images, CT scans, MRIs, or X-rays. "
                    "Medical image interpretation requires evaluation by a qualified healthcare professional."
                    + cls.REQUIRED_DISCLAIMER
                )
        return True, ""

    @classmethod
    def apply_output_guardrail(cls, response_text: str, document_type: str = "general") -> str:
        """
        Appends mandatory non-diagnostic disclaimer to all medical outputs.
        """
        if cls.REQUIRED_DISCLAIMER not in response_text:
            response_text += cls.REQUIRED_DISCLAIMER
        return response_text
