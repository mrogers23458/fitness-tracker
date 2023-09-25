// Modules
const express = require("express");
const mongoose = require("mongoose");
const exerciseApi = express.Router();

// Models
const Exercise = require("../models/Exercise.js");
const User = require("../models/User.js");

// Get Route All
exerciseApi.get("/", async (req, res) => {
  try {
    // Pagination parameters
    const page = req.query.page || 1;
    const limit = req.query.limit || 10; // Default limit is 10

    const skip = (page - 1) * limit; // if page is 1, skip is 0??

    // Query the database with pagination
    const exercises = await Exercise.find().skip(skip).limit(limit);

    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

// Get Route One
exerciseApi.get("/:id", async (req, res) => {
  const id = req.params.id;
  
  // Validate if the 'id' is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid exercise ID format." });
  }

  try {
    const foundExercise = await Exercise.findById(id);
    if (!foundExercise) {
      res.status(404).json({ message: "No exercise found." });
    } else {
      res.status(200).json(foundExercise);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
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
      // reponse code
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
exerciseApi.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;

    // Check if the request body is empty or missing fields (you can customize this validation)
    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({ error: "Invalid update data" });
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(id, update, {
      new: true,
    });

    // Check if the user with the specified ID was found and updated
    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete One Route

exerciseApi.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Perform the deletion and get the result
    const deletedExercise = await Exercise.findByIdAndRemove(id);

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    // 204 No Content indicates successful deletion with no response body
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  
});

module.exports = exerciseApi;
