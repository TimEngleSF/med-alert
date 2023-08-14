const connectDB = require('../db/index.cjs');

let usersCollection;
// let schedulesCollection;
let contactsCollection;
let medicineCollection;

const connectToCollection = async () => {
  if (usersCollection) {
    return;
  }
  try {
    const db = await connectDB();
    usersCollection = db.collection('users');
    // schedulesCollection = db.collection('schedules');
    contactsCollection = db.collection('contacts');
    medicineCollection = db.collection('medicines');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();

module.exports = {
  getAllUserInfo: async (username) => {
    // Get user Info
    const userData = await usersCollection.findOne({ username: username });
    // AggregateMedicine
    const medsCursor = await medicineCollection.aggregate([
      {
        $match: {
          userId: userData._id,
        },
      },
      {
        $project: {
          userId: 0,
        },
      },
      {
        $group: {
          _id: '$userId',
          medicines: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          _id: 0,
          password: 0,
        },
      },
    ]);

    const medsData = await medsCursor.toArray();
    // Get contacts info
    const contactsData = await contactsCollection.findOne({
      userId: userData._id,
    });

    const responseBody = {
      user: userData,
      medicines: medsData[0].medicines,
      contacts: contactsData.contacts,
    };

    return responseBody;
  },
};
