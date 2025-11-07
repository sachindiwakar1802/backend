import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));

// EJS setup
app.set("view engine", "ejs");
app.set("views", "./views");

// Cloudinary setup
cloudinary.config({
  cloud_name: "dygy0ccxz",
  api_key: "321963441556589",
  api_secret: "0mFY510wuVRSWFvzXqDGYOPoT1I",
});

// MongoDB connect
mongoose
  .connect(
    "mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",
    { dbName: "UserAuth" }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));


const User = mongoose.model("User", userSchema);

// ========== MULTER SETUP ==========
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage });

// ================= ROUTES =================

// Home route
app.get("/", (req, res) => {
  res.redirect("/login.ejs",{url:null})
});

// Register Page
app.get("/register", (req, res) => {
  res.render("register.ejs",{url:null})
});

// Handle Register
app.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).send("All fields are required!");

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send("❌ Email already registered!");

    let imageUrl = "";
    let publicId = "";

    // Upload to Cloudinary if file exists
    if (req.file) {
      const filePath = path.resolve(req.file.path);
      const cloudRes = await cloudinary.uploader.upload(filePath, {
        folder: "ProfilePics",
      });
      imageUrl = cloudRes.secure_url;
      publicId = cloudRes.public_id;
      fs.unlinkSync(filePath);
    }

    const newUser = await User.create({
      name,
      email,
      password,
      profilePic: imageUrl,
      public_id: publicId,
    });

    console.log("✅ New User Registered:", newUser.email);

    res.render("profile", { user: newUser });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).send("Something went wrong during registration!");
  }
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send("❌ User not found!");
    if (user.password !== password) return res.send("❌ Wrong password!");

    console.log("✅ Login successful:", user.email);

    res.render("profile", { user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).send("Error during login");
  }
});

// Profile Route
app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.send("User not found!");
    res.render("profile", { user });
  } catch (err) {
    console.error("❌ Profile Error:", err);
    res.status(500).send("Error fetching profile");
  }
});

// Start server
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
