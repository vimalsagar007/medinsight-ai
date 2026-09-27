# GCP Deployment & Infrastructure Guide

## 1. Terraform Infrastructure Provisioning
```bash
cd infrastructure/terraform
terraform init
terraform plan -out=tfplan.binary
terraform apply tfplan.binary
```

## 2. Container Build & Cloud Run Deployment
### Backend Cloud Run Deployment
```bash
gcloud builds submit --tag us-central1-docker.pkg.dev/medinsight-ai-gcp-prod/medinsight-docker-repo/backend-api:v1 backend/

gcloud run deploy medinsight-backend-api \
  --image us-central1-docker.pkg.dev/medinsight-ai-gcp-prod/medinsight-docker-repo/backend-api:v1 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Frontend Cloud Run Deployment
```bash
gcloud builds submit --tag us-central1-docker.pkg.dev/medinsight-ai-gcp-prod/medinsight-docker-repo/frontend:v1 frontend/

gcloud run deploy medinsight-frontend \
  --image us-central1-docker.pkg.dev/medinsight-ai-gcp-prod/medinsight-docker-repo/frontend:v1 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 3. Gemini Agent Runtime Deployment
Deploy `HealthcareOrchestratorAgent` using Vertex AI Agent Runtime CLI:
```bash
agents-cli deploy --agent-path agents/orchestrator/ --target agent-runtime --project medinsight-ai-gcp-prod
```
