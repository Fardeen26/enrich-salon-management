const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
});

const { customerMailTemplate, adminMailTemplate } = require('./emailTemplate');

async function sendMailToCustomer(to, name, service, date, time) {
    try {
        const htmlContent = customerMailTemplate(name, service, date, time);

        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: "Successfully Booked Your Service",
            text: "Your service is successfully booked, Happy!",
            html: htmlContent,
        });
    } catch (error) {
        console.error("Error occurred while sending email to customer:", error);
    }
}

async function sendMailToAdmin(name, service, date, time) {
    try {

        const htmlContent = adminMailTemplate(name, service, date, time)
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "A New Service Is Booked",
            text: `A New Service is created by ${name}`,
            html: htmlContent,
        });
    } catch (error) {
        console.error("Error occurred while sending email to Admin:", error);
    }
}

module.exports = {
    sendMailToCustomer,
    sendMailToAdmin
};