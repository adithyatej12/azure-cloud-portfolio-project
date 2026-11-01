terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
}

provider "azurerm" {
  features {}
}

# ── Dedicated Personal Resource Group ────────────────────────────

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.azure_location

  tags = {
    Environment = var.environment
    Project     = var.app_name
    ManagedBy   = "Terraform"
  }
}

# ── App Service Plan (F1 Free Tier — $0.00/month) ────────────────

resource "azurerm_service_plan" "plan" {
  name                = "${var.app_name}-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "F1"
}

# ── Linux Web App ───────────────────────────────────────────────

resource "azurerm_linux_web_app" "app" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  service_plan_id     = azurerm_service_plan.plan.id

  site_config {
    always_on = false # Required for F1 Free tier

    application_stack {
      docker_image_name   = var.container_image
      docker_registry_url = "https://index.docker.io/v1"
    }
  }

  app_settings = {
    "NODE_ENV"                   = "production"
    "DATABASE_URL"               = var.database_url
    "AUTH_SECRET"                = var.auth_secret
    "AUTH_URL"                   = var.auth_url != "" ? var.auth_url : "https://${var.app_name}.azurewebsites.net"
    "NEXT_PUBLIC_SITE_URL"       = var.next_public_site_url != "" ? var.next_public_site_url : "https://${var.app_name}.azurewebsites.net"
    "FINGERPRINT_SALT"           = var.fingerprint_salt
    "RESEND_API_KEY"             = var.resend_api_key
    "UPLOADTHING_TOKEN"          = var.uploadthing_token
    "GITHUB_TOKEN"               = var.github_token
    "CONTACT_EMAIL_TO"           = var.contact_email_to
    "CONTACT_EMAIL_FROM"         = var.contact_email_from
    "BLOG_EMAIL_FROM"            = var.blog_email_from
    "WEBSITES_PORT"              = "3000"
    "DOCKER_REGISTRY_SERVER_URL" = "https://index.docker.io/v1"
  }
}
