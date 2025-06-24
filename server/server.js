/* eslint-disable no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import userModel from "../models/users.js"; // Make sure the path is correct
import multer from "multer";
import path from "path";
import OwnerOpening from "../models/OwnerOpening.js";

dotenv.config({ path: "./server/.env" }); // Make sure the path is correct

const uri =
  "mongodb+srv://daghsnisaif:saif2002@goldenspoon.dmdnvmt.mongodb.net/?retryWrites=true&w=majority&appName=GoldenSpoon";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("GoldenSpoon API is running!"));

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Add this to your server.js
app.get("/getUser", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users from DB" });
  }
});

// POST route to save a new user
app.post("/addUser", async (req, res) => {
  try {
    const { name, email, password ,phone, location} = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new userModel({ name, email, password, phone, location });

    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Error Handling Middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error!" });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() +  path.extname(file.originalname)); // Unique filename   
  },
});

const upload = multer({
  storage: storage,
  });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("req.file:", req.file); // 👈 check if it logs the file
  console.log("req.body:", req.body);

  if (!req.file) {
    return res.status(400).json({ error: "No file received" });
  }

  OwnerOpening.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => {
      console.error("MongoDB Error:", err);
      res.status(500).json({ error: "Failed to save image to DB" });
    });
});


// Start Server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
