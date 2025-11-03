import express from "express";
import mongoose from "mongoose";
import { shortUrl } from "./controllers/url.js"; // ✅ fixed import

const app = express();
const port = 1000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ✅ Connect MongoDB
mongoose
  .connect(
    "mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",
    { dbName: "url_shortner" }
  )
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.log("❌ DB Error:", err));

// ✅ Render main page
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

// ✅ Handle URL shortening
app.post("/short", shortUrl);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
