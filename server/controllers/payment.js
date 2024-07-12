const Booking = require('../models/Booking');
const {razorpayInstance} = require('../utils/razorpayInstance.js');
const crypto = require("crypto");

module.exports.paymentCheckout = async (req, res) => {
    const options = {
        amount: req.body.price * 100, // amount in smallest currency unit
        currency: "INR",
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const payments = new Map();

module.exports.paymentVerification = async (req, res) => {
    const payment = payments.get(req.body.razorpay_payment_id);

    if (!payment) {
        res.redirect(process.env.PAYMENT_FAILURE_URL);
    }

    const booking = new Booking({
        name: payment.notes.name,
        email: payment.notes.email,
        phone: payment.notes.phone,
        service: payment.notes.service,
        date: payment.notes.date,
        time: payment.notes.time,
        price: payment.amount / 100,
        payment_id: payment.id,
        payment: payment.status
    });

    try {
        const savedBooking = await booking.save();
        console.log(savedBooking)
        payments.delete(req.body.razorpay_payment_id);
        if (payment.status == 'failed') {
            res.redirect(process.env.PAYMENT_FAILURE_URL);
        }
        res.redirect(process.env.PAYMENT_SUCCESS_URL);
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Error saving booking');
    }
}

module.exports.paymentWebhook = async (req, res) => {
    const signature = req.get('x-razorpay-signature');

    try {
        const bodyString = req.body.toString();
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(bodyString)
            .digest('hex');

        if (signature === expectedSignature) {
            const event = JSON.parse(bodyString);

            if (event.event === 'payment.captured') {
                const payment = event.payload.payment.entity;
                console.log(`Payment captured: ${payment.id}`);
                payments.set(payment.id, payment);
            }
            if(event.event === 'payment.failed') {
                return res.redirect(process.env.PAYMENT_FAILURE_URL)
            }
            res.status(200).send('OK');
        }
        else {
            console.log("Invalid Signature!")
            res.status(400).send('Invalid signature');
        }

    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error handling webhook');
    }
}