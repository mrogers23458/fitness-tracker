const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const workoutSchema = new Schema({
  title: String,
  date: String,
  exercises: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
