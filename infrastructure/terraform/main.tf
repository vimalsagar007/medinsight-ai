terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.15.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# 1. Cloud Storage Buckets (Raw vs Extracted Data)
resource "google_storage_bucket" "raw_uploads" {
  name                     = var.raw_uploads_bucket_name
  location                 = var.region
  force_destroy            = false
  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "POST", "PUT", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

resource "google_storage_bucket" "extracted_data" {
  name                     = var.extracted_data_bucket_name
  location                 = var.region
  force_destroy            = false
  uniform_bucket_level_access = true
}

# 2. Pub/Sub Topic for Ingestion Pipeline Events
resource "google_pubsub_topic" "medical_file_ingested" {
  name = "medical-file-ingested-topic"
}

resource "google_pubsub_subscription" "medical_file_ingested_sub" {
  name  = "medical-file-ingested-sub"
  topic = google_pubsub_topic.medical_file_ingested.name

  ack_deadline_seconds = 20
}

# 3. Cloud Healthcare API Dataset & DICOM Store
resource "google_healthcare_dataset" "dataset" {
  name     = var.dicom_dataset_id
  location = var.region
}

resource "google_healthcare_dicom_store" "dicom_store" {
  name    = var.dicom_store_id
  dataset = google_healthcare_dataset.dataset.id

  notification_config {
    pubsub_topic = google_pubsub_topic.medical_file_ingested.id
  }
}

# 4. Artifact Registry for Container Images
resource "google_artifact_registry_repository" "docker_repo" {
  location      = var.region
  repository_id = "medinsight-docker-repo"
  description   = "Docker repository for MedInsight AI microservices"
  format        = "DOCKER"
}

# 5. Secret Manager Secrets
resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = "medinsight-gemini-api-key"
  replication {
    auto {}
  }
}

# 6. Service Account & IAM Bindings
resource "google_service_account" "medinsight_sa" {
  account_id   = "medinsight-app-sa"
  display_name = "Service Account for MedInsight AI Cloud Run"
}

resource "google_project_iam_member" "sa_storage_admin" {
  project = var.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.medinsight_sa.email}"
}

resource "google_project_iam_member" "sa_aiplatform_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.medinsight_sa.email}"
}

resource "google_project_iam_member" "sa_healthcare_editor" {
  project = var.project_id
  role    = "roles/healthcare.dicomEditor"
  member  = "serviceAccount:${google_service_account.medinsight_sa.email}"
}
