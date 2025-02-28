const Application = require('../models/applicationModel');
const Job = require('../models/JobModel');
const User = require('../models/usermodel');

exports.applyJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    // Validate input
    if (!jobId || !resumeUrl) {
      return res.status(400).json({ message: 'Job ID and resume URL are required' });
    }

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Create the application
    const application = new Application({ job: jobId, jobSeeker: req.user.id, resumeUrl });
    await application.save();

    // Add the application to the job's applications list
    job.applications.push(application._id);
    await job.save();

    // Add the application to the user's applied jobs list
    const user = await User.findById(req.user.id);
    user.appliedJobs.push(application._id);
    await user.save();

    // Respond with success message
    res.status(201).json({ message: 'Applied successfully', application });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppliedJobs = async (req, res) => {
  console.log('Entered getAppliedJobs controller');  // This will check if the function is hit
  try {
    // Get the userId from the authentication token
    const userId = req.user.id;

    // Find applications where the jobSeeker is the logged-in user
    const applications = await Application.find({ jobSeeker: userId })
      .populate('job') // Populate job details for each application
      .exec();

    if (!applications) return res.status(404).json({ message: 'No applications found' });

    console.log('Applications found:', applications);  // Log applications for debugging

    res.json(applications);  // Return the list of applications with job details populated
  } catch (error) {
    console.error('Error in getAppliedJobs:', error);  // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};


