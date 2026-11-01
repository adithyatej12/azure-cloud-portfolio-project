variable "azure_location" {
  type        = string
  description = "The Azure region where resources will be created."
  default     = "eastus"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the Azure Resource Group."
  default     = "rg-portfolio-free"
}

variable "environment" {
  type        = string
  description = "Environment name (e.g. prod, staging)."
  default     = "prod"
}

variable "app_name" {
  type        = string
  description = "Base name for application resources."
  default     = "govind-portfolio"
}

variable "acr_name" {
  type        = string
  description = "Globally unique name for Azure Container Registry (alphanumeric only)."
  default     = "acrgovindportfolio"
}

variable "container_image" {
  type        = string
  description = "Full Docker Hub container image reference to deploy."
  default     = "govindmadhav/portfolio:latest"
}

variable "use_azure_container_registry" {
  type        = bool
  description = "Set to true to provision Azure Container Registry ($5/mo fixed cost). Leave false to use free Docker Hub / GHCR."
  default     = false
}

variable "cpu_reservation" {
  type        = number
  description = "Number of vCPUs allocated to the Container App instance."
  default     = 0.25
}

variable "memory_reservation" {
  type        = string
  description = "Memory allocated to the Container App instance (e.g. '0.5Gi')."
  default     = "0.5Gi"
}

# ── Application Secrets & Config ───────────────────────────────

variable "database_url" {
  type        = string
  description = "Neon PostgreSQL connection string."
  sensitive   = true
}

variable "auth_secret" {
  type        = string
  description = "NextAuth session signing secret (min 32 random characters)."
  sensitive   = true
}

variable "auth_url" {
  type        = string
  description = "Canonical URL for NextAuth callbacks (e.g. https://yourdomain.com)."
  default     = ""
}

variable "next_public_site_url" {
  type        = string
  description = "Base URL of the public site for sitemaps and metadata."
  default     = ""
}

variable "fingerprint_salt" {
  type        = string
  description = "Secret salt string for visitor IP hashing."
  sensitive   = true
  default     = "change-me-to-a-secure-random-salt-string"
}

variable "resend_api_key" {
  type        = string
  description = "Resend API key for transactional emails."
  sensitive   = true
  default     = ""
}

variable "uploadthing_token" {
  type        = string
  description = "UploadThing API token for media uploads."
  sensitive   = true
  default     = ""
}

variable "github_token" {
  type        = string
  description = "GitHub Personal Access Token for API data fetching."
  sensitive   = true
  default     = ""
}

variable "contact_email_to" {
  type        = string
  description = "Destination email for contact form submissions."
  default     = ""
}

variable "contact_email_from" {
  type        = string
  description = "Sender email address for contact alerts."
  default     = ""
}

variable "blog_email_from" {
  type        = string
  description = "Sender email address for blog newsletter dispatch."
  default     = ""
}
