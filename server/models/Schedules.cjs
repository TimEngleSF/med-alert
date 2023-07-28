const connectDB = require('../db/index.cjs');

/// Connect to DB
let schedulesCollection;

const connectToCollection = async () => {
  if (schedulesCollection) {
    return;
  }
  try {
    const db = await connectDB();

    schedulesCollection = db.collection('schedules');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();

// Model functions
module.exports = {
  postSchedule: async () => {},
};
