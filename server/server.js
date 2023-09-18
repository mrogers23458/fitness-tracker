// modules
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const api = require("./api/index.js");

// mongo connection
const db = require("./config/connection");

// server instance
const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use(cors());

// routing middleware

db.once("open", () => {
  app.use("/api", api);
  app.listen(PORT, () => {
    console.log(`DB Connected, and app running on port ${PORT}`);
  });
});
