# Salon Booking Website

Welcome to the Enrich Hair Salon Website! This project is designed to provide a seamless experience for users to book appointments at a salon. The website is built with modern web technologies, ensuring a fast and responsive user interface.

## Features

- **Appointment Booking**: Easy-to-use booking system for scheduling salon services.
- **Admin Dashboard**: Includes complex charts, Data Grids, and beautiful notifications for managing bookings and viewing reports.
- **Payment Integration**: Secure payment gateway integration with Razorpay for processing payments.
- **Email Notifications**: Automated email notifications sent to both users and admins upon successful bookings using Nodemailer.
- **Admin Authentication**: Secure authentication for admin.
- **Validation**: Form validation with Zod.
- **Responsive Design**: Fully responsive design that works on all devices.

## Technologies Used

- **Frontend**: React, Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local for development, cloud-based for production)
- **Styling**: Material UI
- **Charts**: react-chartjs-2
- **Data Grids**: MUI Data Grids
- **Notifications**: Sonner
- **Payment Gateway**: Razorpay
- **Validation**: Zod
- **Email**: Nodemailer

## Project Structure

- **client/**: Contains all the source code for the frontend.
  - **src/**: main folder for frontend.
  - **components/**: Reusable components used across the application.
  - **admin/**: all teh components for admin dashboard.
  
  
- **server/**: Backend code for handling API requests, authentication, and database interactions.
  - **models/**: Mongoose models for MongoDB collections.
  - **routes/**: API routes for different functionalities (e.g., booking).
  - **controllers/**: Logic for handling API requests.
  - **utils/**: Services for payment processing (Razorpay), email notifications (Nodemailer), and validation (Zod).

## Usage

### Booking an Appointment

1. **Choose a Service**: Browse the available services and select the one you want to book.
2. **Select a Date and Time**: Choose your preferred date and time for the appointment.
3. **Make Payment**: Securely pay for your booking using the Razorpay payment gateway.
4. **Confirmation**: Receive a confirmation email with the details of your appointment.

### Admin Dashboard

1. **Log In**: Admins can log in with their credentials.
2. **Manage Bookings**: View and manage all bookings made by users.
3. **Generate Reports**: View monthly/daily reports with complex charts and data grids.
4. **Manage Services**: Add, edit, or delete salon services.
5. **Receive Notifications**: Get notified about important events and updates.

## Deployment

The website is not yet deployed. This soon will be deployed!
