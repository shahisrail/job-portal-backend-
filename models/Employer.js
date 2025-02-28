const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Employer', employerSchema);
