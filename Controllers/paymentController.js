const stripe = require("stripe")(
  "sk_test_51OEuuJKc6cWjkGN6wac43QFhEVjHVFMsyAYKltjlSA46ShnBVWz9Z3bsrxuZ9B6KWblR3cxO0aeeWRhO4ZES0X2E00sG3FUQ29"
);

// Create a payment session
exports.checkout = async (req, res) => {
  try {
    const { amount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Job Posting Fee",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment/success`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// Payment success handler
exports.paymentSuccess = (req, res) => {
  res.send("Payment Successful");
};

// Payment cancel handler
exports.paymentCancel = (req, res) => {
  res.send("Payment Canceled");
};
