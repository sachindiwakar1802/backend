import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));

// Cloudinary setup
cloudinary.config({
  cloud_name: "dygy0ccxz",
  api_key: "321963441556589",
  api_secret: "0mFY510wuVRSWFvzXqDGYOPoT1I",
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",
    { dbName: "Imageuploader" }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Schema & Model
const imageSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  ImgUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});
const File = mongoose.model("cloudinary", imageSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.get("/", async (req, res) => {
  const images = await File.find().sort({ uploadedAt: -1 });
  res.render("index", { images });
});

// Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);

    // Upload to Cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
      folder: "NodeJS_Mastery_Course",
    });

    // Save to MongoDB
    const db = await File.create({
      filename: req.file.originalname,
      public_id: cloudinaryRes.public_id,
      ImgUrl: cloudinaryRes.secure_url,
    });

    // Delete local file
    fs.unlinkSync(filePath);

    // Show uploaded image on the page
    const images = await File.find().sort({ uploadedAt: -1 });
    res.render("index", { images });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Something went wrong during upload" });
  }
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
