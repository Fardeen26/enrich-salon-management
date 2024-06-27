const { default: mongoose } = require("mongoose")
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:  String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    result: {
        type: Boolean
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;