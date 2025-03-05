const PaymentHistory = require("../models/Payment"); // Import PaymentHistory model
const stripe = require("stripe")(
  "sk_test_51OEuuJKc6cWjkGN6wac43QFhEVjHVFMsyAYKltjlSA46ShnBVWz9Z3bsrxuZ9B6KWblR3cxO0aeeWRhO4ZES0X2E00sG3FUQ29"
); // Use environment variable for security
const express = require("express");
const router = express.Router();

// Create payment session for checkout
// Create payment session for checkout
router.post("/create-payment-session", async (req, res) => {
  const { jobId, userId } = req.body; // amount will now be fixed at 100 USD
  
  const amount = 10000; // 100 USD in cents

  try {
    // Create a payment session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Job Application Fee",
              description: `Payment for applying to job ${jobId}`,
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/jobs/${jobId}/applied-success`, // Redirect after success
      cancel_url: `${process.env.CLIENT_URL}/jobs/${jobId}`, // Redirect if canceled
      metadata: {
        jobId,
        userId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ message: "Payment session creation failed" });
  }
});

// Payment success handler
router.get("/payment-success", async (req, res) => {
  try {
    const { jobId } = req.query;
    const userId = req.user.id; // Get userId from token

    // Save payment details in the database
    const paymentHistory = new PaymentHistory({
      payer: userId,
      jobId,
      role: "jobseeker",
      amount: 100, // You can calculate the payment amount dynamically
      status: "paid",
      paymentId: req.query.payment_intent, // Payment ID from Stripe
    });

    await paymentHistory.save();

    // Send success response to frontend
    res.redirect(`/jobs/${jobId}`); // Redirect to job page or application page
  } catch (error) {
    console.error("Error in payment success:", error);
    res.status(500).json({ message: "Payment failed" });
  }
});

// Payment cancel handler
router.get("/payment-cancel", (req, res) => {
  res.status(200).json({ message: "Payment was canceled" });
});

// Webhook to handle payment success or failure
router.post(
  "/payment-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Error verifying webhook signature:", err);
      return res.status(400).send("Webhook error");
    }

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const jobId = session.metadata.jobId;
      const userId = session.metadata.userId;

      // You can update the job application status in your database here
      // Example: Save the payment details and mark the job application as successful.

      console.log(
        `Payment for Job ID ${jobId} by User ID ${userId} was successful!`
      );
    }

    res.status(200).send("Webhook received");
  }
);

module.exports = router;
