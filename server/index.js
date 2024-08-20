require('dotenv').config();
const port = process.env.PORT;
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');


const dataRouter = require('./routes/dataRoutes.js');
const paymentRouter = require('./routes/paymentRoutes.js')
const adminRouter = require('./routes/adminRoutes.js')

app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

const dburl = process.env.LOCAL_MONGO_URL;
main().then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}))

app.use('/service-data', dataRouter);
app.use('/', paymentRouter);
app.use('/api/admin', adminRouter);


app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Ngrok URL:', 'https://4d0d-103-167-194-225.ngrok-free.app');
});