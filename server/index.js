require('dotenv').config();
const port = process.env.PORT || 8080;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const moment = require('moment');
const cors = require('cors');
const app = express();


const dataRouter = require('./routes/dataRoutes.js');
const paymentRouter = require('./routes/paymentRoutes.js')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const dburl = process.env.MONGO_URL;
main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}


app.get('/', (req, res) => {
  res.send('Project Root!');
});

app.use('/servicedata', dataRouter); 
app.use('/', paymentRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Ngrok URL:', 'https://4d0d-103-167-194-225.ngrok-free.app'); // Replace with your actual ngrok URL
});