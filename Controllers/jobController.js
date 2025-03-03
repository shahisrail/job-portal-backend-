const Job = require("../models/JobModel");

// Create a job
// Create a job
exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer")
      return res.status(403).json({ message: "Access denied" });

    const { title, description, country, location, salary, image ,requirements } = req.body;

    // Create a new job using the provided data
    const newJob = new Job({
      title,
      description,
      country,
      location,
      salary,
      image,
      employer: req.user.id,
      requirements 
    });

    // Save the job to the database
    await newJob.save();

    res.status(201).json(newJob);
  } catch (err) {
    // Handle validation errors specifically
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: err.errors });
    }
    res.status(500).json({ message: "Server error7." });
  }
};

// List all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server errorxxx." });
  }
};

// Get job by ID
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error6." });
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
    res.status(500).json({ message: "Server error5." });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error4." });
  }
};

// List jobs by country
exports.getJobsByCountry = async (req, res) => {
  try {
    const jobs = await Job.find({ country: req.params.cn });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error3." });
  }
};
exports.getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("applications");
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json(job.applications);
  } catch (err) {
    res.status(500).json({ message: "Server error2." });
  }
};
exports.getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.user.id; // Get employer ID from the token (after auth)

    const jobs = await Job.find({ employer: employerId }).populate('applications');

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error1' });
  }
};