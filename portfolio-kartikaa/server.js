import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  cors({
    origin: true,
  })
);

// Backend API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required.",
    });
  }

  console.log("Contact form submission:");
  console.log({
    name,
    email,
    message,
  });

  res.status(200).json({
    success: true,
    message: "Message received successfully.",
  });
});

// Serve React production build
app.use(express.static(path.join(__dirname, "dist")));

// React SPA fallback
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      message: "API endpoint not found.",
    });
  }

  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio running on port ${PORT}`);
});