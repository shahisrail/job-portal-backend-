const express = require('express');
const router = express.Router();
const { checkout, paymentSuccess, paymentCancel } = require('../Controllers/paymentController');

router.post('/checkout', checkout);
router.get('/success', paymentSuccess);
router.get('/cancel', paymentCancel);

module.exports = router;
