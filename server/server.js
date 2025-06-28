/* eslint-disable no-unused-vars */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
import userModel from "../models/user/users.js";
import "../models/opening/OwnerOpening.js"
import { data } from "react-router-dom";

dotenv.config({ path: "./server/.env" }); 

const uri =
  "mongodb+srv://daghsnisaif:saif2002@goldenspoon.dmdnvmt.mongodb.net/?retryWrites=true&w=majority&appName=GoldenSpoon";
const app = express({ limit: "500mb" });

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
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


// Start Server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const Images = mongoose.model("OwnerOpening");

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


app.post("/uploadOpening", async (req, res) => {
  const {base64}=req.body;  
  try {

    await Images.create({image:base64})
    res.send({Status:"ok"})

    
  } catch (err) {
    res.send({Status:"error",data:err});
  }
});
app.get("/getOpening", async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({Status:"ok",data:data})
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch openings from DB" });
  }
})