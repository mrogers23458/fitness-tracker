const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  workouts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Workout",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
