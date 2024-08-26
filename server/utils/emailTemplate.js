// emailTemplate.js
function customerMailTemplate(name, service, date, time) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                max-width: 100px;
                margin-bottom: 10px;
            }
            .header h1 {
                color: #333333;
                font-size: 24px;
                margin: 0;
            }
            .content {
                color: #555555;
                font-size: 16px;
                line-height: 1.5;
            }
            .content h2 {
                color: #333333;
                font-size: 20px;
                margin-top: 0;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 14px;
                color: #999999;
            }
            .footer a {
                color: rgb(100, 142, 244);
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="https://static.vecteezy.com/system/resources/previews/021/826/122/non_2x/logo-for-barbershop-men-s-hairstyle-salon-stylish-man-with-haircut-beard-and-mustaches-vector.jpg" alt="Salon Logo">
                <h1>Booking Confirmation</h1>
            </div>
            <div class="content">
                <h2>Dear ${name},</h2>
                <p>We're excited to let you know that your <strong>${service}</strong> service has been successfully booked!</p>
                <p>Here are your booking details:</p>
                <ul>
                    <li><strong>Date:</strong> ${date}</li>
                    <li><strong>Time:</strong> ${time}</li>
                </ul>
                <p>We look forward to seeing you soon and making your experience exceptional.</p>
                <p>If you have any questions or need to make changes to your booking, please feel free to <a href="https://github.com/Fardeen26">contact us</a>.</p>
            </div>
            <div class="footer">
                <p>Thank you for choosing our salon!</p>
                <p><a href="https://b7v4hvw7-5173.inc1.devtunnels.ms/">Visit our website</a> | <a href="https://github.com/Fardeen26">Follow us on social media</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
}


// adminNotificationTemplate.js
function adminMailTemplate(name, service, date, time) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                max-width: 100px;
                margin-bottom: 10px;
            }
            .header h1 {
                color: #333333;
                font-size: 24px;
                margin: 0;
            }
            .content {
                color: #555555;
                font-size: 16px;
                line-height: 1.5;
            }
            .content h2 {
                color: #333333;
                font-size: 20px;
                margin-top: 0;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 14px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="https://static.vecteezy.com/system/resources/previews/021/826/122/non_2x/logo-for-barbershop-men-s-hairstyle-salon-stylish-man-with-haircut-beard-and-mustaches-vector.jpg" alt="Salon Logo">
                <h1>New Service Created</h1>
            </div>
            <div class="content">
                <h2>Hello Admin,</h2>
                <p>A new service has been successfully created in the system. Below are the details:</p>
                <ul>
                    <li><strong>Service Name:</strong> ${service}</li>
                    <li><strong>Created By:</strong> ${name}</li>
                    <li><strong>Date of Booking:</strong> ${date}</li>
                    <li><strong>Time of Booking:</strong> ${time}</li>
                </ul>
                <p>Please review the new service and ensure all details are correct.</p>
                <p>Thank you for keeping our services up-to-date!</p>
            </div>
            <div class="footer">
                <p>This is an automated notification. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports = {
    customerMailTemplate,
    adminMailTemplate
}    
