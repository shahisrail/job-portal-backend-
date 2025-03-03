const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeUrl: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
