// const Booking = require('../models/Booking');
// const { razorpayInstance } = require('../utils/razorpayInstance.js');
// const crypto = require("crypto");
// const { sendMailToCustomer, sendMailToAdmin } = require('../utils/NodeMailer.js')


// module.exports.paymentCheckout = async (req, res) => {
//     const options = {
//         amount: req.body.price * 100,
//         currency: "INR",
//     };

//     try {
//         const order = await razorpayInstance.orders.create(options);
//         res.json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Server Error");
//     }
// };

// const payments = new Map();

// module.exports.paymentVerification = async (req, res) => {
//     const payment = payments.get(req.body.razorpay_payment_id);

//     if (!payment) {
//         res.redirect(process.env.PAYMENT_FAILURE_URL);
//     }

//     const booking = new Booking({
//         name: payment.notes.name,
//         email: payment.notes.email,
//         phone: payment.notes.phone,
//         service: payment.notes.service,
//         date: payment.notes.date,
//         time: payment.notes.time,
//         price: payment.amount / 100,
//         payment_id: payment.id,
//         payment: payment.status
//     });

//     try {
//         const savedBooking = await booking.save();
//         payments.delete(req.body.razorpay_payment_id);
//         if (payment.status == 'failed') {
//             return res.redirect(process.env.PAYMENT_FAILURE_URL);
//         }
//         sendMailToAdmin(payment.notes.name, payment.notes.service, payment.notes.date, payment.notes.time);
//         sendMailToCustomer(payment.notes.email, payment.notes.name, payment.notes.service, payment.notes.date, payment.notes.time);
//         res.redirect(process.env.PAYMENT_SUCCESS_URL);

//     } catch (error) {
//         console.error('Error saving booking:', error);
//         res.status(500).send('Error on saving booking');
//     }
// }

// module.exports.paymentWebhook = async (req, res) => {
//     const signature = req.get('x-razorpay-signature');

//     try {
//         const bodyString = req.body.toString();
//         const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
//             .update(bodyString)
//             .digest('hex');

//         if (signature === expectedSignature) {
//             const event = JSON.parse(bodyString);

//             if (event.event === 'payment.captured') {
//                 const payment = event.payload.payment.entity;
//                 console.log(`Payment captured: ${payment.id}`);
//                 payments.set(payment.id, payment);
//             }
//             if (event.event === 'payment.failed') {
//                 return res.redirect(process.env.PAYMENT_FAILURE_URL)
//             }
//             res.status(200).send('OK');
//         }
//         else {
//             console.log("Invalid Signature!")
//             res.status(400).send('Invalid signature');
//         }

//     } catch (error) {
//         console.error('Error handling webhook:', error);
//         res.status(500).send('Error handling webhook');
//     }
// }

// module.exports.creatingBooking = async (req, res) => {
//     const data = req.body;

//     const booking = new Booking({
//         name: data.name,
//         email: data.email,
//         phone: data.phone,
//         service: data.service,
//         date: data.date,
//         time: data.formTime,
//         price: data.price,
//         payment: "captured"
//     });

//     const savedBooking = await booking.save();
//     sendMailToCustomer(data.email, data.name, data.service, data.date, data.formTime);
//     res.json(savedBooking);
// }


// // let message = {
// //     from: 'Nodemailer <example@nodemailer.com>',
// //     to: 'Nodemailer <example@nodemailer.com>',
// //     subject: 'AMP4EMAIL message',
// //     text: 'For clients with plaintext support only',
// //     html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
// //     amp: `<!doctype html>
// //     <html ⚡4email>
// //       <head>
// //         <meta charset="utf-8">
// //         <style amp4email-boilerplate>body{visibility:hidden}</style>
// //         <script async src="https://cdn.ampproject.org/v0.js"></script>
// //         <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
// //       </head>
// //       <body>
// //         <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/>${hi}</p>
// //         <p>GIF (requires "amp-anim" script in header):<br/>
// //           <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
// //       </body>
// //     </html>`
// // }


const Booking = require('../models/Booking');
const { razorpayInstance } = require('../utils/razorpayInstance.js');
const crypto = require("crypto");
const { sendMailToCustomer, sendMailToAdmin } = require('../utils/NodeMailer.js');

// Map to store payments temporarily
const payments = new Map();

module.exports.paymentCheckout = async (req, res) => {
    const { price } = req.body;
    const options = {
        amount: price * 100, // Convert price to paise (smallest currency unit)
        currency: "INR",
    };

    try {
        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error during payment checkout:', error);
        res.status(500).send("Server Error");
    }
};

module.exports.paymentVerification = async (req, res) => {
    const { razorpay_payment_id } = req.body;
    const payment = payments.get(razorpay_payment_id);

    if (!payment) {
        return res.redirect(process.env.PAYMENT_FAILURE_URL);
    }

    const bookingData = {
        name: payment.notes.name,
        email: payment.notes.email,
        phone: payment.notes.phone,
        service: payment.notes.service,
        date: payment.notes.date,
        time: payment.notes.time,
        price: payment.amount / 100, // Convert amount back to currency unit
        payment_id: payment.id,
        payment: payment.status
    };

    const booking = new Booking(bookingData);

    try {
        const savedBooking = await booking.save();
        payments.delete(razorpay_payment_id);

        if (payment.status === 'failed') {
            return res.redirect(process.env.PAYMENT_FAILURE_URL);
        }

        sendMailToAdmin(payment.notes.name, payment.notes.service, payment.notes.date, payment.notes.time);
        sendMailToCustomer(payment.notes.email, payment.notes.name, payment.notes.service, payment.notes.date, payment.notes.time);

        res.redirect(process.env.PAYMENT_SUCCESS_URL);

    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Error saving booking');
    }
};

module.exports.paymentWebhook = async (req, res) => {
    const signature = req.get('x-razorpay-signature');
    const bodyString = JSON.stringify(req.body);

    try {
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
            .update(bodyString)
            .digest('hex');

        if (signature !== expectedSignature) {
            console.log("Invalid Signature!");
            return res.status(400).send('Invalid signature');
        }

        const event = req.body;

        if (event.event === 'payment.captured') {
            const payment = event.payload.payment.entity;
            console.log(`Payment captured: ${payment.id}`);
            payments.set(payment.id, payment);
        } else if (event.event === 'payment.failed') {
            return res.redirect(process.env.PAYMENT_FAILURE_URL);
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('Error handling webhook:', error);
        res.status(500).send('Error handling webhook');
    }
};

module.exports.creatingBooking = async (req, res) => {
    // console.log(req.body)
    console.log("yha nhi aaya bhai");
    const { name, email, phone, service, date, formTime, price } = req.body;

    const bookingData = {
        name,
        email,
        phone,
        service,
        date,
        time: formTime,
        price,
        payment: "captured"
    };

    try {
        const savedBooking = await new Booking(bookingData).save();
        // sendMailToCustomer(email, name, service, date, formTime);
        res.json(savedBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking');
    }
};
