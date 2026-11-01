# Azure Deployment with Terraform

This directory contains complete **Terraform** infrastructure-as-code configuration to provision and deploy the Portfolio application onto **Azure Container Apps (ACA)** with **Azure Container Registry (ACR)**, powered by an external **Neon PostgreSQL** database.

---

## Prerequisites

1. **Terraform CLI**: Installed locally ([Download Terraform](https://developer.hashicorp.com/terraform/downloads)).
2. **Azure CLI**: Installed locally (`az login`).
3. **Docker**: Running locally to build & push container images.
4. **Neon Database**: An active Neon PostgreSQL database instance (`DATABASE_URL`).

---

## Directory Structure

```
terraform/
├── main.tf                 # Core Azure resources (Resource Group, ACR, Log Analytics, ACA)
├── variables.tf            # Input variable declarations
├── outputs.tf              # Outputs (ACR credentials, App URL, build commands)
├── terraform.tfvars.example # Template for production configuration & secrets
└── README.md               # Instructions guide
```

---

## Step 1: Authenticate with Azure CLI

Open your terminal and authenticate to Azure:

```bash
az login
```
*(If you have multiple tenants, run `az login --tenant <TENANT_ID>`)*

Verify your active subscription:
```bash
az account show
```

---

## Step 2: Configure Environment Variables (`terraform.tfvars`)

Copy the template file to `terraform.tfvars`:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set your real secrets:
- `database_url`: Your **Neon DB** connection string.
- `auth_secret`: Generated 32-byte secret (`openssl rand -base64 32`).
- `fingerprint_salt`: Any secure random salt string.
- `resend_api_key`, `uploadthing_token`, `github_token` (Optional).

*Note: `terraform.tfvars` is git-ignored to prevent committing credentials.*

---

## Step 3: Initialize & Provision Infrastructure

1. Initialize Terraform modules and providers:
   ```bash
   terraform init
   ```

2. Review planned resources:
   ```bash
   terraform plan
   ```

3. Provision the Azure infrastructure:
   ```bash
   terraform apply
   ```
   *Type `yes` when prompted to confirm.*

---

## Step 4: Build & Push Docker Image to ACR

Once Terraform completes, it will output your **ACR login server** and **deployment instructions**.

1. Login to Azure Container Registry:
   ```bash
   az acr login --name acrgovindportfolio
   ```

2. Build your Next.js application container locally:
   ```bash
   docker build -t acrgovindportfolio.azurecr.io/portfolio:latest .
   ```

3. Push the image to ACR:
   ```bash
   docker push acrgovindportfolio.azurecr.io/portfolio:latest
   ```

4. Restart your Container App revision to run the newly uploaded container:
   ```bash
   az containerapp revision restart --name govind-portfolio --resource-group rg-portfolio-prod
   ```

---

## Step 5: Verify Deployment

Terraform outputs your public application URL at the end of `terraform apply`:
```bash
terraform output container_app_url
```

Open the printed URL in your browser to verify your live Next.js portfolio!

---

## Useful Maintenance Commands

- **View Container Logs**:
  ```bash
  az containerapp logs show --name govind-portfolio --resource-group rg-portfolio-prod --follow
  ```

- **Destroy All Azure Resources**:
  ```bash
  terraform destroy
  ```
