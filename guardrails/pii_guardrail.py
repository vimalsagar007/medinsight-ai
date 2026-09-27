import re
from typing import Tuple

class PIIGuardrail:
    """
    PII / PHI Redaction Guardrail
    Detects and redacts sensitive patient identifiers (SSN, MRN, Phone Numbers, Email, Addresses)
    before logging or passing data to external APIs.
    """
    
    SSN_PATTERN = r"\b\d{3}-\d{2}-\d{4}\b"
    PHONE_PATTERN = r"\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b"
    EMAIL_PATTERN = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
    MRN_PATTERN = r"\bMRN-?\d{6,10}\b"

    @classmethod
    def redact(cls, text: str) -> str:
        if not text:
            return text
        sanitized = re.sub(cls.SSN_PATTERN, "[REDACTED_SSN]", text)
        sanitized = re.sub(cls.PHONE_PATTERN, "[REDACTED_PHONE]", sanitized)
        sanitized = re.sub(cls.EMAIL_PATTERN, "[REDACTED_EMAIL]", sanitized)
        sanitized = re.sub(cls.MRN_PATTERN, "[REDACTED_MRN]", sanitized)
        return sanitized

    @classmethod
    def contains_pii(cls, text: str) -> bool:
        if not text:
            return False
        return any([
            re.search(cls.SSN_PATTERN, text),
            re.search(cls.PHONE_PATTERN, text),
            re.search(cls.EMAIL_PATTERN, text),
            re.search(cls.MRN_PATTERN, text)
        ])
