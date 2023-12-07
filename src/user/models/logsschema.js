const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logsSchema = new Schema({
  term: String,
  createdAT: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Logs", logsSchema);
