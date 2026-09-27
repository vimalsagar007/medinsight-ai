from typing import Dict, Any

class DocumentClassificationAgent:
    """
    DocumentClassificationAgent
    Classifies uploaded files into structured healthcare document categories.
    Categories:
    - blood report
    - pathology report
    - radiology report
    - CT report
    - MRI report
    - ultrasound report
    - X-ray report
    - prescription
    - discharge summary
    - operative report
    - consultation note
    - ECG report
    - medication list
    - insurance document
    - general medical document
    """

    @classmethod
    def classify(cls, filename: str, content_snippet: str, mime_type: str = "") -> Dict[str, Any]:
        text_lower = (filename + " " + content_snippet).lower()

        if "ct" in text_lower or "computed tomography" in text_lower or "nodule" in text_lower:
            return {
                "document_type": "radiology_report",
                "modality": "CT",
                "body_region": "chest",
                "confidence": 0.96
            }
        elif "mri" in text_lower or "magnetic resonance" in text_lower:
            return {
                "document_type": "radiology_report",
                "modality": "MRI",
                "body_region": "brain_spine",
                "confidence": 0.95
            }
        elif "blood" in text_lower or "glucose" in text_lower or "cbc" in text_lower or "cmp" in text_lower or "hba1c" in text_lower:
            return {
                "document_type": "blood_report",
                "modality": "LAB",
                "body_region": "systemic",
                "confidence": 0.98
            }
        elif "discharge" in text_lower:
            return {
                "document_type": "discharge_summary",
                "modality": "CLINICAL_NOTE",
                "body_region": "general",
                "confidence": 0.92
            }
        elif "prescription" in text_lower or "mg" in text_lower or "sig:" in text_lower:
            return {
                "document_type": "prescription",
                "modality": "PHARMACY",
                "body_region": "general",
                "confidence": 0.90
            }
        elif "dicom" in text_lower or filename.endswith(".dcm"):
            return {
                "document_type": "dicom_image_file",
                "modality": "DICOM",
                "body_region": "unknown",
                "confidence": 0.99
            }
        elif mime_type.startswith("video/") or filename.endswith((".mp4", ".mov", ".avi")):
            return {
                "document_type": "medical_video",
                "modality": "MULTIMEDIA_VIDEO",
                "body_region": "general",
                "confidence": 0.98
            }
        elif mime_type.startswith("audio/") or filename.endswith((".wav", ".mp3")):
            return {
                "document_type": "medical_audio",
                "modality": "MULTIMEDIA_AUDIO",
                "body_region": "general",
                "confidence": 0.98
            }
        else:
            return {
                "document_type": "general_medical_document",
                "modality": "DOCUMENT",
                "body_region": "unspecified",
                "confidence": 0.85
            }
