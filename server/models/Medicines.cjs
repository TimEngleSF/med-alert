const { BSON } = require('mongodb');

const connectDB = require('../db/index.cjs');

/// Connect to DB
let medicinesCollection;

const connectToCollection = async () => {
  if (medicinesCollection) {
    return;
  }
  try {
    const db = await connectDB();

    medicinesCollection = db.collection('medicines');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();

// Model functions
module.exports = {
  updateTaken: async (id, boolean) => {
    const objectId = new BSON.ObjectId(id);
    try {
      const data = await medicinesCollection.findOneAndUpdate(
        { _id: objectId },
        {
          $set: { taken: boolean },
          $currentDate: { timeTaken: { $type: 'date' } },
        },
        { returnDocument: 'after' }
      );
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
