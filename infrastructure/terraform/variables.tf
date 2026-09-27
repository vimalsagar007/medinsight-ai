variable "project_id" {
  type        = string
  description = "Google Cloud Project ID"
  default     = "medinsight-ai-gcp-prod"
}

variable "region" {
  type        = string
  description = "Google Cloud Region"
  default     = "us-central1"
}

variable "raw_uploads_bucket_name" {
  type        = string
  default     = "medinsight-raw-uploads-prod"
}

variable "extracted_data_bucket_name" {
  type        = string
  default     = "medinsight-extracted-data-prod"
}

variable "dicom_dataset_id" {
  type        = string
  default     = "medinsight_healthcare_ds"
}

variable "dicom_store_id" {
  type        = string
  default     = "medinsight_dicom_store"
}
