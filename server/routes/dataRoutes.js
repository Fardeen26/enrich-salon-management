const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data')

router.get("/service-data", dataController.serviceData);


module.exports = router;

