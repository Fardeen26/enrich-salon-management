const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dataController = require('../controllers/data')

router.route("/")
.get(bodyParser.json(), dataController.serviceData);

module.exports = router;