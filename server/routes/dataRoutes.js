const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data')

router.route("/")
    .get(dataController.serviceData);

module.exports = router;