const mongoose = require("mongoose");

const PaymentHistorySchema = new mongoose.Schema({
  payer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // Refers to the user who made the payment (job seeker or employer)
    required: true
  },
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", // Job for which payment was made
    required: true
  },
  role: { 
    type: String, 
    enum: ["jobseeker", "employer"], 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["paid", "failed"],
    required: true 
  },
  paymentDate: { 
    type: Date, 
    default: Date.now 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  paymentId: { 
    type: String, 
    required: false // Payment gateway transaction ID (e.g., Stripe, PayPal)
  },
});

module.exports = mongoose.model("PaymentHistory", PaymentHistorySchema);
