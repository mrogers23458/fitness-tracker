const express = require("express");
const app = express();

const exerciseApi = require("./exerciseApi.js");
const userApi = require("./userApi.js");
const workoutApi = require("./workoutApi.js");

app.use("/exercise", exerciseApi);
app.use("/user", userApi);
app.use("/workout", workoutApi);

module.exports = app;
