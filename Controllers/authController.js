const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const user = new User({ name, email, password, role });

    // Save the user to the database
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with token and success message
    res.status(201).json({ 
      token,
      message: "User registered successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server212212" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Send response with token and success message
  res.json({
    token,
    message: "User logged in successfully"
  });
};
