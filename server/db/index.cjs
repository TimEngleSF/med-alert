const { MongoClient } = require('mongodb');

const NAME = process.env.DB_NAME;
const USERNAME = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const ADDRESS = process.env.DB_LOCATION;
const PORT = process.env.DB_PORT;
const AUTH = process.env.DB_AUTH;

const uri = `mongodb//${USERNAME}:${PASS}@${ADDRESS}:${PORT}/?authMechanism=DEFAULT&authSource=${AUTH}`;
// const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  if (db) {
    return;
  }
  try {
    await client.connect();
    db = client.db(NAME);

    return db;
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
