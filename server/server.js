/* eslint-disable no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import userModel from "../models/user/users.js"; // Make sure the path is correct
import multer from "multer";
import path from "path";
import OwnerOpening from "../models/opening/OwnerOpening.js";

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

// GET route to fetch all users
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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error!" });
});


const storage = multer.memoryStorage();

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const newEntry = new OwnerOpening({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await newEntry.save();
    res.status(201).json({ message: "Image saved to MongoDB" });
  } catch (err) {
    console.error("MongoDB save error:", err);
    res.status(500).json({ error: "Failed to save image" });
  }
});



// GET route to fetch all images
app.get("/getOpening/:id", async (req, res) => {
  try {
    const item = await OwnerOpening.findById(req.params.id);
    if (!item) return res.status(404).send("Image not found");

    res.set("Content-Type", item.image.contentType);
    res.send(item.image.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


// Start Server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));