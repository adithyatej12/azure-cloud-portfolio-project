const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable Gzip compression for high-performance asset serving on Azure
app.use(compression());

// Serve static assets (HTML, CSS, JS, Images)
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: true
}));

// Route handler for single-page application fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Node.js server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Azure Cloud Portfolio Server is active!`);
  console.log(`🌐 Server running on port: ${PORT}`);
  console.log(`==================================================`);
});
