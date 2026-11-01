const username = "Goivnd_Madhav";
const token = "87e9135a569e937564be1ebc83e1e3f19c42ac5f";
const domain = "govindmadhav.dev";
const sslToken = "_09appmphf8g78be4slqhy3q2rwei769";

const authHeader = "Basic " + Buffer.from(`${username}:${token}`).toString("base64");

async function addTxt() {
  const records = [
    { host: sslToken, type: "TXT", answer: domain, ttl: 300 },
    { host: "", type: "TXT", answer: sslToken, ttl: 300 },
    { host: "asuid", type: "TXT", answer: sslToken, ttl: 300 }
  ];
  for (const r of records) {
    try {
      const res = await fetch(`https://api.name.com/v4/domains/${domain}/records`, {
        method: "POST",
        headers: { "Authorization": authHeader, "Content-Type": "application/json" },
        body: JSON.stringify(r)
      });
      const data = await res.json();
      console.log(`Added SSL TXT record host='${r.host}':`, data);
    } catch (e) {
      console.error(e);
    }
  }
}

addTxt();
