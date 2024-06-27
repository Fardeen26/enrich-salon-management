require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Service = require('./models/service')

app.use(bodyParser.json());
app.use(cors());
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


app.get('/servicedata', async (req, res) => {
  const servicedata = await Service.find({});
  res.json(servicedata);
})

app.post('/payment', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: req.body.service
          },
          unit_amount: req.body.price * 100
        },
        quantity: 1
      },
    ],
    mode: 'payment',
    // payment_method_types: ['card'],
    success_url: process.env.PAYMENT_SUCCESS_URL,
    cancel_url: process.env.PAYMENT_FAILURE_URL,
  });

  res.json(session);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
