const Job = require("../models/JobModel");

// Create a job
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer")
      return res.status(403).json({ message: "Access denied" });
    const { title, description, country, location, salary } = req.body;
    const newJob = new Job({ ...req.body, employer: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// List all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// List jobs by country
exports.getJobsByCountry = async (req, res) => {
  try {
    const jobs = await Job.find({ country: req.params.cn });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }

  
};
exports.getJobApplicants = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("applications");
      if (!job) return res.status(404).json({ message: "Job not found." });
      res.json(job.applications);
    } catch (err) {
      res.status(500).json({ message: "Server error." });
    }
  };