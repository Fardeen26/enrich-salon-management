const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const bodyParser = require('body-parser');

router.post('/checkout', bodyParser.json(), paymentController.paymentCheckout)
router.post('/paymentverification', bodyParser.json(), paymentController.paymentVerification);
router.post('/webhook', bodyParser.raw({ type: '*/*' }), paymentController.paymentWebhook);

module.exports = router;