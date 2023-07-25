const connectDB = require('../db/index.cjs');

let usersCollection;
let schedulesCollection;
let contactsCollection;

const connectToCollection = async () => {
  if (usersCollection) {
    return;
  }
  try {
    const db = await connectDB();
    usersCollection = db.collection('users');
    schedulesCollection = db.collection('schedules');
    contactsCollection = db.collection('contacts');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();

module.exports = {
  createUser: async (reqBody) => {
    const { user, sched, contacts } = reqBody;

    const userDocument = {
      name: user.name,
      email: user.email,
      authenticated: true,
      authorization: 'user',
      qrCode: null,
      allergies: user.allergies,
    };

    const scheduleDocument = sched.map((medicine) => ({
      name: medicine.name,
      time: medicine.time,
      timeTaken: null,
      taken: false,
    }));

    const userResult = await usersCollection.insertOne({ ...userDocument });
    const userId = userResult.insertedId;
    const schedResult = await schedulesCollection.insertOne({
      userId,
      scheduleDocument,
    });
    const contactResult = await contactsCollection.insertOne({
      contacts,
      userId,
    });

    const responseBody = {
      user: { id: userId, ...userDocument },
      schedule: { id: schedResult.insertedId, scheduleDocument },
      contacts: { id: contactResult.insertedId, contacts },
    };
    return responseBody;
  },
};
