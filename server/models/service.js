const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName:{
        type: String,
        required: true
    },

    price: {
        type: Number,
        require:true
    },
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;