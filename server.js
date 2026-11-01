const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simulated AWS Health API Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    region: 'ap-south-1',
    service: 'Simran Cloud Portfolio Engine',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    metrics: {
      latency: '12ms',
      cpuUtilization: '1.2%',
      memoryUsage: '42MB',
      activeConnections: 1
    }
  });
});

// Simulated Serverless Contact Form Endpoint (API Gateway + Lambda simulation)
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      statusCode: 400,
      error: 'Missing required parameters',
      requiredFields: ['name', 'email', 'message']
    });
  }

  // Simulate AWS SNS / SQS Trigger log
  console.log(`[CloudWatch Log] Message received from ${name} <${email}>: "${subject || 'Portfolio Inquiry'}"`);

  return res.status(200).json({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Powered-By': 'AWS Lambda Serverless'
    },
    body: {
      message: 'Message logged and routed to Simran Sahay successfully!',
      requestId: `req-${Math.random().toString(36).substring(2, 11)}`,
      receivedAt: new Date().toISOString()
    }
  });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`☁️ SIMRAN SAHAY CLOUD PORTFOLIO SERVER STARTED`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`⚡ AWS Cloud Watch Monitoring: Active`);
  console.log(`====================================================`);
});
