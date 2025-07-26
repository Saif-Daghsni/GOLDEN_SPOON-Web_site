
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "../models/user/users.js";
import "../models/Opening.js";
import PlatesModel from "../models/Plates.js";
import AmbianceModel from "../models/Ambiance.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import process from "process";

const uri =
  "mongodb+srv://daghsnisaif:saif2002@goldenspoon.dmdnvmt.mongodb.net/?retryWrites=true&w=majority&appName=GoldenSpoon";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "900mb" }));

// Routes
app.get("/", (req, res) => res.send("GoldenSpoon API is running!"));

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const Images = mongoose.model("OwnerOpening");

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error!" });
});

// User Authentication Routes
app.get("/getUser", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password"); // Remove password from result

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1) Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2) Create & save the user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
    });
    await newUser.save();

    // 3) Sign a JWT
    const tokenPayload = { id: newUser._id, email: newUser.email };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 4) Send back the user (without password) and the token
    res.status(201).json({
      message: "User added successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add user" });
  }
});


app.post("/uploadOpening", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (err) {
    res.send({ Status: "error", data: err });
  }
});

app.get("/getOpening", async (req, res) => {
  try {
    await Images.find({}).then((data) => {
      res.send({ Status: "ok", data: data });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch openings from DB" });
  }
});

app.delete("/deleteOpening/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Images.findByIdAndDelete(id);
    res.status(200).json({ message: "Opening deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting opening", error });
  }
});

app.post("/AddPlates", async (req, res) => {
  try {
    const { name, description, price, type, image } = req.body;
    console.log("🟢 Parsed:", { name, description, price, type, image });

    const newPlate = new PlatesModel({ name, description, price, type, image });

    await newPlate.save();

    res
      .status(201)
      .json({ message: "plate added successfully", user: newPlate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add plate" });
  }
});

app.get("/getPlates", async (req, res) => {
  try {
    const plates = await PlatesModel.find({});
    res.status(200).json({ plates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get plates" });
  }
});

app.delete("/deletePlate/:id", async (req, res) => {
  console.log("🟢 Delete Plate Request Received");
  try {
    const { id } = req.params;
    await PlatesModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Plate deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete plate", err });
  }
});


app.post("/AddAmbiance", async (req, res) => {
  try {
    const { image } = req.body;
    console.log("🟢 Parsed:", { image });

    const newAmbiance = new AmbianceModel({ image });

    await newAmbiance.save();

    res
      .status(201)
      .json({ message: "Ambiance added successfully", user: newAmbiance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add Ambiance" });
  }
});

app.get("/getAmbiance", async (req, res) => {
  try {
    const data = await AmbianceModel.find({});
    res.send({ Status: "ok", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Ambiance from DB" });
  }
});

app.delete("/deleteAmbiance/:id", async (req, res) => {
  
  try {
    const { id } = req.params;

    await AmbianceModel.findByIdAndDelete(id); 
    res.status(200).json({ message: "Ambiance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Faild to delete Ambiance", err });
  }
});

