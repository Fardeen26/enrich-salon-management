// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const adminController = require('../controllers/admin');



// // router.get('/data', bodyParser.json(), adminController.getData)
// router.get('/check-auth', adminController.checkAuth);
// router.get('/dashboard', adminController.checkAuthMiddleware, adminController.dashboard);
// router.get('/booking-count', adminController.BookingsCount);
// router.get('/total-revenue', adminController.TotalRevenue);
// router.get('/total-services', adminController.services);
// router.get('/total-customers', adminController.customers);
// router.get('/all-bookings', adminController.allBookings);
// router.get('/recent-bookings', adminController.recentBookings);
// router.get('/services-count', adminController.servicesCount)
// router.get('/all-services', adminController.allServices)
// router.get('/profile-url', adminController.profileUrl)
// router.get('/service-formdata/:id', adminController.serviceFormData)
// router.get('/monthly-bookings', adminController.monthlyBookings);
// router.post('/login', bodyParser.json(), adminController.login);
// router.post('/edit-service/:id', bodyParser.json(), adminController.editService);
// router.post('/new-service', bodyParser.json(), adminController.newService);
// router.post('/edit-adminprofile', bodyParser.json(), adminController.editAdmin)
// router.delete('/delete-service/:id', adminController.deleteService);

// module.exports = router;


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');

// Middleware to parse JSON request bodies
const jsonParser = bodyParser.json();

// Public routes
router.post('/login', jsonParser, adminController.login);

// Authenticated routes
router.use(adminController.checkAuthMiddleware); // Applies authentication middleware to all routes below

router.get('/check-auth', adminController.checkAuth);
router.get('/dashboard', adminController.dashboard);
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
router.post('/edit-adminprofile', jsonParser, adminController.editAdminProfile);
router.delete('/delete-service/:id', adminController.deleteService);

module.exports = router;
