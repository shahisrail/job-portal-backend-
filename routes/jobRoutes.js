const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCountry,
  getJobApplicants
} = require('../Controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);
router.get('/country/:cn', getJobsByCountry);
router.get('/:id/applicants', authMiddleware,  getJobApplicants);

module.exports = router;
