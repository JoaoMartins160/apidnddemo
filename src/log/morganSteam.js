const morgan = require("morgan");
const logs = require("../user/models/logsschema");
const express = require("express");
const app = express();
const { getUserNameFromToken } = require("../auth/token");

app.use(getUserNameFromToken);

morgan.token("user", function getUser(req, res) {
  return res.locals.userName;
});

const stream = {
  write: (message) => {
    const logEntry = {
      term: message,
      createdAT: Date.now(),
    };
    logs.create(logEntry);
  },
};

const morganSteam = morgan(
  ":user :method :url :status :res[content-length] - :response-time ms",
  {
    stream,
  }
);

module.exports = morganSteam;
