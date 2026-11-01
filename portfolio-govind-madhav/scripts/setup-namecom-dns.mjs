// Helper script to automatically configure Name.com DNS records for Azure Container Apps
const username = "Goivnd_Madhav";
const token = "87e9135a569e937564be1ebc83e1e3f19c42ac5f";
const domain = "govindmadhav.dev";
const targetFqdn = "govind-portfolio.jollyglacier-6c87a091.eastus.azurecontainerapps.io";
const verificationId = "8A767BA34764397195F3AA6A5E017AE21FA0C248029D67AC6AE8BAE4C49587ED";

const authHeader = "Basic " + Buffer.from(`${username}:${token}`).toString("base64");

const records = [
  { host: "asuid", type: "TXT", answer: verificationId, ttl: 300 },
  { host: "asuid.www", type: "TXT", answer: verificationId, ttl: 300 },
  { host: "www", type: "CNAME", answer: targetFqdn, ttl: 300 },
  { host: "", type: "ANAME", answer: targetFqdn, ttl: 300 }
];

async function setupDns() {
  console.log(`Setting up DNS records for ${domain} on Name.com...`);
  
  for (const record of records) {
    try {
      const response = await fetch(`https://api.name.com/v4/domains/${domain}/records`, {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(record)
      });
      const data = await response.json();
      console.log(`Created record [${record.type}] host='${record.host}':`, data);
    } catch (err) {
      console.error(`Failed to create record ${record.host}:`, err);
    }
  }
}

setupDns();
