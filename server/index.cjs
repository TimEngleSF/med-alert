require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
const morgan = require('morgan');
const nodeCron = require('./notification/notifyContact.cjs');

require('./strategies/local.cjs');
const router = require('./routes.cjs');
const authRouter = require('./routes/auth.cjs');
const connectDb = require('./db/index.cjs');

const PORT = process.env.EX_PORT || 3000;

const startServer = async () => {
  try {
    const db = await connectDb();

    app.use(morgan('dev'));
    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.use(
      cors({
        origin: 'http://127.0.0.1:5173',
        credentials: true,
      })
    );

    app.use('/api/auth', authRouter);
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

nodeCron.cron;
startServer();
