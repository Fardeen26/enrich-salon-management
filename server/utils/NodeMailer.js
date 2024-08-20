const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
    },
});


async function sendMailToCustomer(to, name, service, date, time) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: "Successfully Booked You Service",
            text: "Your service is successfully booked, Happy!",
            html: `<b>Hy ${name} your ${service} service is booked successfully on ${date} at ${time}!</b>`,
        });

        console.log("Message sent successfully to customer: %s", info.response);
    } catch (error) {
        console.error("Error occurred while sending email to customer:", error);
    }

}


async function sendMailToAdmin(name, service, date, time) {
    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "A New Service Is Booked",
            text: `A New Service is created by ${name}`,
            html: `<b>A new ${service} service is booked by ${name} on ${date} at ${time}</b>`,
        });

        console.log("Message sent successfully to admin: %s", info.response);
    } catch (error) {
        console.error("Error occurred while sending email to Admin:", error);
    }
}

module.exports = {
    sendMailToCustomer,
    sendMailToAdmin
};

