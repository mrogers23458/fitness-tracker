// Modules
const express = require("express");
const exerciseApi = express.Router();

// Models
const Exercise = require("../models/Exercise.js");
const User = require("../models/User.js");

// Get Route All
exerciseApi.get("/", (req, res) => {});

// Get Route One
exerciseApi.get("/:id", (req, res) => {
  const id = req.params.id;
});

// Create Route
exerciseApi.post("/", async (req, res) => {
  try {
    // abstract properties from req.body
    const { name, sets, reps, userId } = req.body;

    // if all necessary information is there create the exercise
    if ((name, sets, reps, userId)) {
      const newExercise = await Exercise.create({
        name,
        sets,
        reps,
        user: userId,
      });
      res.status(201).json(newExercise);
    } else {
      res.status(400).json({ message: "All information is required" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update One Route
exerciseApi.put("/:id", (req, res) => {
  const id = req.params.id;
});

// Delete One Route

exerciseApi.delete("/:id", (req, res) => {
  const id = req.params.id;
});

module.exports = exerciseApi;
