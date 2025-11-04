import mongoose from "mongoose";
import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const app = express();
const port = 7000;

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

// Schema & Model (optional)
const imageSchema = new mongoose.Schema({
  filename: String,
  cloudinary_url: String,
  uploadedAt: { type: Date, default: Date.now },
});
const Image = mongoose.model("Image", imageSchema);

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
app.get("/", (req, res) => {
  res.render("index", { url: null });
});

// Upload route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);

    // Upload to Cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(filePath, {
      folder: "NodeJS_Mastery_Course",
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    // Save to MongoDB
    const newImage = new Image({
      filename: req.file.filename,
      cloudinary_url: cloudinaryRes.secure_url,
    });
    await newImage.save();

    res.json({
      message: "✅ File uploaded successfully!",
      cloudinaryData: cloudinaryRes,
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Something went wrong during upload" });
  }
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
