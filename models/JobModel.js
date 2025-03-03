const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title is required
  description: { type: String, required: true }, // Description is required
  country: { type: String, required: true }, // Country is required
  location: { type: String, required: true }, // Location is required
  salary: { type: String, required: true }, // Salary is required
  image: { type: String, required: true }, // Image URL is required
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Employer is required
  requirements: [
    {
      value: { type: String, required: true },
    },
  ],

  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
