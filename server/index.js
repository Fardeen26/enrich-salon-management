require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session);
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

const dburl = process.env.MONGO_ATLAS_URL;
main().then(() => {
  console.log("Connected to Database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}

const store = new MongoDBStore({
  uri: process.env.MONGO_ATLAS_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use('/api', dataRouter);
app.use('/api', paymentRouter);
app.use('/api/admin', adminRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});