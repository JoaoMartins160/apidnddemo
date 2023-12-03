const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@web-project.cww0cfx.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3300);
    console.log("Conectou ao banco!");
  })
  .catch((err) => console.log(err));
