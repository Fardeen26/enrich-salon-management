const Service = require('../models/service');

module.exports.serviceData = async(req, res) => {
    const servicedata = await Service.find({});
    res.json(servicedata);
}