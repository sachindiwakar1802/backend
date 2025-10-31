import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname manually (needed in ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Serve your HTML file correctly:
app.get("/", (req, res) => {
  const fullPath = path.join(__dirname, "index.html");
  console.log("Serving file:", fullPath);
  res.sendFile(fullPath);
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
