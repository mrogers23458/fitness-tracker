// Modules
const express = require("express");
const mongoose = require("mongoose");
const userApi = express.Router();

// Models
const User = require("../models/User.js");

// Get Route All
userApi.get("/", async (req, res) => {
  try {
    // Pagination parameters
    const page = req.query.page || 1;
    const limit = req.query.limit || 10; // Default limit is 10

    const skip = (page - 1) * limit;

    // Query the database with pagination
    const users = await User.find().skip(skip).limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Get Route One
userApi.get("/:id", async (req, res) => {
  const id = req.params.id;

  // Validate if the 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format." });
  }

  try {
    const foundUser = await User.findById(id);
    if (!foundUser) {
      res.status(404).json({ message: "No user found." });
    } else {
      res.status(200).json(foundUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Create Route
userApi.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const newUser = await User.create({ username, password });
      res.status(201).json(newUser);
    } else if (!username) {
      res.status(400).json({ message: "Username is required." });
    } else if (!password) {
      res.status(400).json({ message: "Password is required." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update One Route
userApi.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    // Check if the request body is empty or missing fields (you can customize this validation)
    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({ error: "Invalid update data" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    // Check if the user with the specified ID was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete One Route
userApi.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Perform the deletion and get the result
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // 204 No Content indicates successful deletion with no response body
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userApi;
