// Modules
const express = require("express");
const userApi = express.Router();

// Models
const User = require("../models/User.js");

// Get Route All
userApi.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get Route One
userApi.get("/:id", (req, res) => {
  const id = req.params.id;
});

// Create Route
userApi.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const newUser = await User.create({ username, password });
      res.status(201).json(newUser);
    } else {
      res
        .status(400)
        .json({ message: "Both username and password are required" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update One Route
userApi.put("/:id", (req, res) => {
  const id = req.params.id;
});

// Delete One Route

userApi.delete("/:id", (req, res) => {
  const id = req.params.id;
});

module.exports = userApi;
