const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] // Custom error message for validation
  },
  email: { 
    type: String, 
    unique: true, 
    required: [true, 'Email is required'], // Custom error message for validation
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'] // Email format validation
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], // Custom error message for validation
    minlength: [6, 'Password must be at least 6 characters long'] // Password length validation
  },
  role: { 
    type: String, 
    enum: ['jobSeeker', 'employer'], 
    required: [true, 'Role is required'], // Custom error message for validation
  },
  appliedJobs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application' 
  }]
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
