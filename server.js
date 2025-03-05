const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const ApplicationRoutes = require("./routes/applicatoinRoutes");
const UserRoutes = require('./routes/userroute');
// const router = require("./Controllers/paymentController");

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
app.use("/api/application", ApplicationRoutes);
console.log(ApplicationRoutes)
// app.use("/api/payment", router);
app.use('/api/user', UserRoutes);
app.use('/api/user', UserRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
