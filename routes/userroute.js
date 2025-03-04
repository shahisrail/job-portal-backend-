const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user }); // Assuming user data is stored in JWT payload
});

module.exports = router;
