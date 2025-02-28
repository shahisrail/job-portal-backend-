const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  amount: Number,
  status: { type: String, default: 'pending' },
  paymentId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
