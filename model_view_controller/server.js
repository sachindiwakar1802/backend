
// =========================
//  Import Dependencies
// =========================
import express from "express";
import mongoose from "mongoose";
import { User } from "./models/User.js";

// =========================
//  App Configuration
// =========================
const app = express();
const PORT = 7000;

// =========================
//  Middlewares
// =========================
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(express.json()); // To handle JSON data

// =========================
//  View Engine Setup
// =========================
app.set("view engine", "ejs");
app.set("views", "./views");

// =========================
//  MongoDB Connection
// =========================
mongoose
  .connect(
    "mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",
    { dbName: "Nodejs" }
  )
  .then(() => console.log("✅ Mongoose connected successfully!"))
  .catch((err) => console.error("❌ Mongoose connection error:", err));

// =========================
//  Routes
// =========================

// 👉 Home Route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// 👉 Form Submit Route (POST)
app.post("/form-submit", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({
      success: true,
      message: "✅ Your form is submitted. User created successfully.",
      newUser: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `❌ Error: ${error.message}`,
    });
  }
});

// =========================
//  Server Start
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
