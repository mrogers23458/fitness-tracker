// Modules
const express = require("express");
const workoutApi = express.Router();

// Models
const Workout = require("../models/Workout.js");

// Get Route All
workoutApi.get("/", (req, res) => {});

// Get Route One
workoutApi.get("/:id", (req, res) => {
  const id = req.params.id;
});

// Create Route
workoutApi.post("/", async (req, res) => {
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
workoutApi.put("/:id", (req, res) => {
  const id = req.params.id;
});

// Delete One Route

workoutApi.delete("/:id", (req, res) => {
  const id = req.params.id;
});

module.exports = workoutApi;
