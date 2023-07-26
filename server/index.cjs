require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./db/index.cjs');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes.cjs');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const startServer = async () => {
  try {
    const db = await connectDb();

    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      session({
        secret: 'your secret here',
        resave: false,
        saveUninitialized: true,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api/', router);

    app.listen(PORT, () => {
      console.log(
        `Connected to ${db.databaseName},  Server listening on port ${PORT}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
