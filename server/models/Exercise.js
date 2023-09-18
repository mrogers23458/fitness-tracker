const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
  user: {
    type: mongoose.Schema.ObjectId,
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
