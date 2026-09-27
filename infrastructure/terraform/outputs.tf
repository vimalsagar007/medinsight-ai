output "raw_uploads_bucket_url" {
  value = google_storage_bucket.raw_uploads.url
}

output "extracted_data_bucket_url" {
  value = google_storage_bucket.extracted_data.url
}

output "dicom_store_id" {
  value = google_healthcare_dicom_store.dicom_store.id
}

output "pubsub_topic_id" {
  value = google_pubsub_topic.medical_file_ingested.id
}

output "artifact_registry_repo" {
  value = google_artifact_registry_repository.docker_repo.name
}

output "service_account_email" {
  value = google_service_account.medinsight_sa.email
}
