const Service = require('../models/service');
const data = require('../init/testimonials');

module.exports.serviceData = async (req, res) => {
    try {
        const servicedata = await Service.find({});
        res.status(200).json(servicedata);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error fetching service data' });
    }
}

module.exports.testimonialData = (req, res) => {
    try {
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}