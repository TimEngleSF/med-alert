const { comparePassword } = require('../utils/helpers.cjs');
const connectDB = require('../db/index.cjs');
var { ObjectId } = require('mongodb');

let usersCollection;

const connectToCollection = async () => {
  if (usersCollection) {
    return;
  }
  try {
    const db = await connectDB();
    usersCollection = db.collection('users');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();
