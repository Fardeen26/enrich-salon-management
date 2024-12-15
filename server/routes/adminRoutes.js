const express = require('express');
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');
const { verifyToken } = require('../middleware');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/login', jsonParser, adminController.login);

// Authenticated routes
router.get('/dashboard', verifyToken, adminController.adminDashboard)
router.get('/booking-count', adminController.BookingsCount);
router.get('/total-revenue', adminController.TotalRevenue);
router.get('/total-services', adminController.totalServices);
router.get('/total-customers', adminController.totalCustomers);
router.get('/all-bookings', adminController.allBookings);
router.get('/recent-bookings', adminController.recentBookings);
router.get('/services-count', adminController.servicesCount);
router.get('/all-services', adminController.allServices);
router.get('/profile-url', adminController.profileUrl);
router.get('/service-formdata/:id', adminController.serviceFormData);
router.get('/monthly-bookings', adminController.monthlyBookings);

// Admin actions
router.post('/edit-service/:id', jsonParser, adminController.editService);
router.post('/create-service', jsonParser, adminController.createService);
router.put('/edit-adminprofile', jsonParser, adminController.editAdminProfile);
router.delete('/delete-service/:id', adminController.deleteService);

module.exports = router;
