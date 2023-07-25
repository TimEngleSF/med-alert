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
  postUser: async (reqBody) => {
    const { user, sched, contacts } = reqBody;

    const document = {
      name: user.name,
      email: user.email,
      authenticated: true,
      authorization: 'user',
      qr_code: null,
      allergies: user.allergies,
    };

    const result = await usersCollection.insertOne({ ...document });
    await schedulesCollection.insertOne({
      sched,
      user_id: result.insertedId,
    });
    await contactsCollection.insertOne({
      contacts,
      user_id: result.insertedId,
    });
    return result;
  },
};
