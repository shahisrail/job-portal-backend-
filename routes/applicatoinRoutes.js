const express = require("express");
const router = express.Router();
const {
  applyJob,
  getAppliedJobs,
} = require("../Controllers/applicationControllers");
const authMiddleware = require('../middleware/authMiddleware');
router.post("/apply", authMiddleware, applyJob);
router.get("/app", authMiddleware, getAppliedJobs);

module.exports = router;
