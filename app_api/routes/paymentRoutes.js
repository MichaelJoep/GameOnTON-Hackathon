const express = require('express');
const router = express.Router();
const {initiatePayment, verifyPayment, aeonWebhook} = require('../controllers/aeonController');

// Route to initiate payment
router.post('/initiate-payment', initiatePayment);

// Route to verify payment
router.post('/verify-payment', verifyPayment);

// Webhook for AEON payment status
router.post('/verify-payment/status/:paymentId', aeonWebhook);



module.exports = router;