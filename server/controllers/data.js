const Service = require('../models/service');

module.exports.serviceData = async (req, res) => {
    try {
        const servicedata = await Service.find({});
        res.status(200).json(servicedata);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error fetching service data' });
    }
}