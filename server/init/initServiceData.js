const mongoose = require('mongoose');
const serviceData = require('./serviceData')
const Service = require('../models/service')
const mongo_url = process.env.LOCAL_MONGO_URL;

main().then(() => {
  console.log("Connected to MongoDB");
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