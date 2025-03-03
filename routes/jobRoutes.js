const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCountry,
  getJobApplicants,
  getEmployerJobs
} = require('../Controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', authMiddleware, updateJob);
router.delete('/:id', authMiddleware, deleteJob);
router.get('/country/:cn', getJobsByCountry);
router.get('/:id/applicants', authMiddleware,  getJobApplicants);
router.get('/employer/jobs', authMiddleware, getEmployerJobs);

module.exports = router;
