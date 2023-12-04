const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
var db = "mongodb://localhost:27017";

app.use(express.json());

const dbUser = process.env.DBUser;
const dbPassword = process.env.DBPassword;

mongoose
  .connect(db)
  .then(() => {
    app.listen(8080);
    console.log("Conectou ao banco!");
  })
  .catch((err) => console.log(err));
