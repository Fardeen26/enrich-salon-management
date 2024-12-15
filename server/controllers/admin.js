const Admin = require('../models/Admin');
const adminCredentials = require('../models/Admin');
const Booking = require('../models/Booking');
const Service = require('../models/service');
const Services = require('../models/service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({ username: 'fardeen mansuri' });

    if (username !== adminUser.username) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });

    res.json({ token });
}

module.exports.adminDashboard = (req, res) => {
    res.status(200).json({ authorized: true });
}

// Booking Count
module.exports.BookingsCount = async (req, res) => {
    try {
        const count = await Booking.countDocuments();
        if (count > 0) {
            return res.status(200).json(count);
        }
        res.status(404).json({ success: false, message: 'No data available' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while fetching the data' });
    }
};

// Total Revenue
module.exports.TotalRevenue = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$price' },
                },
            },
        ]);

        const totalSum = result[0]?.total || 0;
        res.status(200).json(totalSum);
    } catch (error) {
        console.error('Error fetching total revenue:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the data' });
    }
};

// Toatal Services Count
module.exports.totalServices = async (req, res) => {
    try {
        const count = await Services.countDocuments();
        if (count > 0) {
            return res.status(200).json(count);
        }
        res.status(404).json({ success: false, message: 'No data available' });
    } catch (error) {
        console.error('Error fetching service count:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the data' });
    }
};

// Total Unique Customers
module.exports.totalCustomers = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            {
                $group: {
                    _id: { name: "$name", email: "$email", phone: "$phone" },
                },
            },
            {
                $count: "uniqueCustomersCount"
            }
        ]);

        const uniqueCustomersCount = result[0]?.uniqueCustomersCount || 0;
        res.status(200).json(uniqueCustomersCount);
    } catch (error) {
        console.error('Error counting unique customers:', error);
        res.status(500).json({ success: false, message: 'An error occurred while counting unique customers' });
    }
};

// All Sorted Bookings 
module.exports.allBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ _id: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Recent Bookings 5
module.exports.recentBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
// Indivisual services count
module.exports.servicesCount = async (req, res) => {
    try {
        const serviceCounts = await Booking.aggregate([
            {
                $group: {
                    _id: "$service",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    service: "$_id",
                    count: 1
                }
            }
        ]);

        res.status(200).json(serviceCounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching service counts', error });
    }
};

// All Services
module.exports.allServices = async (req, res) => {
    try {
        const services = await Services.find({});
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: true, message: "Error fetching all services" });
    }
};

// Individual Service Data
module.exports.serviceFormData = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error fetching service data' });
    }
};

// Edit Service
module.exports.editService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.findByIdAndUpdate(id, { serviceName: req.body.serviceName, price: req.body.servicePrice });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating service' });
    }
};

// Create service
module.exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving new service' });
    }
};

// Delete Service
module.exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error deleting service' });
    }
};

// Admon Profile Img URL
module.exports.profileUrl = async (req, res) => {
    const { username, password, profilePic } = adminCredentials;
    res.status(200).json({ username, password, profilePic });
};

// Edit Admin Profile
module.exports.editAdminProfile = async (req, res) => {
    try {
        const { username, password } = req.body;
        adminCredentials.username = username;
        adminCredentials.password = password;
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating admin credentials' });
    }
};

// Total Bookings Month Wise
module.exports.monthlyBookings = async (req, res) => {
    try {
        const bookings = await Booking.aggregate([
            {
                $addFields: {
                    parsedDate: {
                        $dateFromString: {
                            dateString: "$date",
                            format: "%Y-%m-%d"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$parsedDate" },
                        year: { $year: "$parsedDate" }
                    },
                    totalBookings: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            {
                $group: {
                    _id: "$_id.year",
                    months: {
                        $push: {
                            month: "$_id.month",
                            totalBookings: "$totalBookings"
                        }
                    }
                }
            },
            {
                $project: {
                    year: "$_id",
                    months: {
                        $map: {
                            input: { $range: [1, 13] },
                            as: "monthNumber",
                            in: {
                                $let: {
                                    vars: {
                                        monthData: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$months",
                                                        as: "m",
                                                        cond: { $eq: ["$$m.month", "$$monthNumber"] }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    },
                                    in: {
                                        month: "$$monthNumber",
                                        totalBookings: {
                                            $ifNull: ["$$monthData.totalBookings", 0]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$months"
            },
            {
                $replaceRoot: {
                    newRoot: {
                        month: "$months.month",
                        year: "$year",
                        totalBookings: "$months.totalBookings"
                    }
                }
            }
        ]);

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching monthly bookings', error });
    }
};