const express = require("express");
const router = express.Router();
const {
  applyJob,
  getAppliedJobs,
} = require("../Controllers/applicationControllers");
const { getJobCountries } = require("../Controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/apply", authMiddleware, applyJob);
router.get("/app", authMiddleware, getAppliedJobs);
router.get("/countries",  getJobCountries);

module.exports = router;
