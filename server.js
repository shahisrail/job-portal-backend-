const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const ApplicationRoutes = require("./routes/applicatoinRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
// Root Route
app.get("/", (req, res) => {
  res.send(" Job portal server  is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobs", ApplicationRoutes);
console.log(ApplicationRoutes)
app.use("/api/payment", paymentRoutes);
// app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
