const mongoose = require('mongoose');
const serviceData = require('./serviceData')
const Service = require('../models/service')
const mongo_url = 'mongodb://127.0.0.1:27017/enrich-hair-salon';

main().then(() => {
    console.log("init Connected to MongoDB"); 
}).catch(err => console.log(err));

async function main() {
  console.log(mongo_url);
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Service.deleteMany({});
    await Service.insertMany(serviceData.data);
    console.log("Data was initialized");
}
 
initDB();