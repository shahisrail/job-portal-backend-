const Application = require("../models/applicationModel");
const Job = require("../models/JobModel");
const User = require("../models/usermodel");

exports.applyJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    // Validate input
    if (!jobId || !resumeUrl) {
      return res
        .status(400)
        .json({ message: "Job ID and resume URL are required" });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Get the user role from the authenticated user
    const user = await User.findById(req.user.id);

    // If the user is an employer, they cannot apply to their own job posts
    if (
      user.role === "employer" &&
      job.employer.toString() === user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Employers cannot apply to their own job posts." });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      jobSeeker: req.user.id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // Create the application
    const application = new Application({
      job: jobId,
      jobSeeker: req.user.id,
      resumeUrl,
    });
    await application.save();

    // Add the application to the job's applications list
    job.applications.push(application._id);
    await job.save();

    // Add the application to the user's applied jobs list
    user.appliedJobs.push(application._id);
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

// Assuming the Application model is here

exports.getAppliedJobs = async (req, res) => {
  try {
    // Get the userId from the authentication token (provided by middleware)
    const userId = req.user.id; // Using _id from the token

    // Find applications where the jobSeeker is the logged-in user
    const applications = await Application.find({ jobSeeker: userId })
      .populate("job") // Populate job details from the Job collection
      .exec();

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    // Return the applications with populated job details
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Server erro23" });
  }
};
