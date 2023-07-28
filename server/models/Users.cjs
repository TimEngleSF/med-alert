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
  getAllUser: async (email) => {},

  createUser: async (reqBody) => {
    const { user, sched, contacts } = reqBody;

    const userDocument = {
      name: user.name,
      email: user.email,
      authenticated: true,
      authorization: 'user',
      qrCode:
        'https://image-charts.com/chart?chs=150x150&cht=qr&chl=http://127.0.0.1:5173&choe=UTF-8',
      allergies: user.allergies,
    };

    const medicineDocuments = sched.map((medicine) => ({
      name: medicine.name,
      time: medicine.time,
      timeTaken: null,
      taken: false,
    }));

    //  Insert user
    const userResult = await usersCollection.insertOne({ ...userDocument });
    const userId = userResult.insertedId;

    //  Insert Medicine
    await Promise.all(
      medicineDocuments.map(
        async (med) => await medicineCollection.insertOne({ userId, ...med })
      )
    );

    // Insert Contacts
    const contactResult = await contactsCollection.insertOne({
      contacts,
      userId,
    });

    // AggregateMedicine
    const medsCursor = await medicineCollection.aggregate([
      {
        $match: {
          userId: userId,
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
        },
      },
    ]);

    const medsData = await medsCursor.toArray();

    const responseBody = {
      user: { id: userId, ...userDocument },
      // schedule: { id: schedResult.insertedId, scheduleDocument },
      medicines: medsData[0].medicines,
      contacts: { id: contactResult.insertedId, contacts },
    };
    return responseBody;
  },
};
