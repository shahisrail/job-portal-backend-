const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  country: String,
  location: String,
  salary: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
