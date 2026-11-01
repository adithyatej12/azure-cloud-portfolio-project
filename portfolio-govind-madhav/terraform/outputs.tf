output "resource_group_name" {
  description = "The name of the Azure Resource Group."
  value       = azurerm_resource_group.rg.name
}

output "web_app_name" {
  description = "Name of the deployed Azure Linux Web App."
  value       = azurerm_linux_web_app.app.name
}

output "azure_default_url" {
  description = "The default Azure HTTPS URL."
  value       = "https://${azurerm_linux_web_app.app.default_hostname}"
}

output "custom_domain_url" {
  description = "Your custom domain live URL."
  value       = "https://govindmadhav.dev"
}

output "dns_setup_instructions" {
  description = "DNS CNAME & TXT records to point govindmadhav.dev to your Azure App."
  sensitive   = true
  value       = <<EOT
===================================================================
Custom Domain Setup for govindmadhav.dev:
===================================================================
1. Add CNAME record in your registrar (Name.com/Cloudflare/etc.):
   Type: CNAME
   Host/Name: @ (or www)
   Value: ${azurerm_linux_web_app.app.default_hostname}

2. Add TXT record for Azure verification:
   Type: TXT
   Host/Name: asuid.govindmadhav.dev
   Value: ${azurerm_linux_web_app.app.custom_domain_verification_id}
===================================================================
EOT
}
