require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const MongoStore = require('connect-mongo');
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

const dburl = process.env.MONGO_ATLAS_URL;
main().then(() => {
  console.log("Connected to Database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);
}


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_ATLAS_URL,
      collectionName: "sessions",
      stringify: false,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "none",
      secure: true,
    },
  })
);

app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  console.log("Cookies:", req.cookies);
  next();
});

app.use('/api', dataRouter);
app.use('/api', paymentRouter);
app.use('/api/admin', adminRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});