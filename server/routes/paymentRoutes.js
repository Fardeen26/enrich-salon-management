const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const bodyParser = require('body-parser');
const bookingSchema = require('../authentication/bookingSchema')
const { validateBooking } = require('../middleware')

router.post('/demo-booking', bodyParser.json(), paymentController.creatingBooking)
router.post('/checkout', bodyParser.json(), validateBooking(bookingSchema), paymentController.paymentCheckout)
router.post('/paymentverification', bodyParser.json(), paymentController.paymentVerification);
router.post('/webhook', bodyParser.raw({ type: '*/*' }), paymentController.paymentWebhook);

module.exports = router;