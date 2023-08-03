const { ObjectId } = require('mongodb');

const nodeCron = require('node-cron');
const { parse, addMinutes, differenceInMinutes } = require('date-fns');

const connectDB = require('../db/index.cjs');

let usersCollection;
let contactsCollection;
let medicineCollection;

const connectToCollection = async () => {
  if (usersCollection) {
    return;
  }
  try {
    const db = await connectDB();
    usersCollection = db.collection('users');
    contactsCollection = db.collection('contacts');
    medicineCollection = db.collection('medicines');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

connectToCollection();

module.exports = nodeCron.schedule('5,35 * * * *', () => {
  const checkTakenMedices = async () => {
    const medicines = await medicineCollection.find({ taken: false }).toArray();
    const filteredMed = medicines.filter((med) => checkIfLate(med.time));

    const contactsPromises = filteredMed
      .map((med) => med.userId)
      .map((id) => getContact(id))
      .map((contact) => contact.phone);

    const contactsToText = await Promise.all(contactsPromises);
    console.log(contactsToText);
  };

  checkTakenMedices();
});

// Helper function
const checkIfLate = (givenTime) => {
  const parsedGivenTime = parse(givenTime, 'HH:mm', new Date());
  const fiveMinutesAdded = addMinutes(parsedGivenTime, 5);

  const currentTime = new Date();

  const difference = differenceInMinutes(currentTime, fiveMinutesAdded);

  return Math.abs(difference) <= 1;
};

const getContact = async (userId) => {
  const query = new ObjectId(userId);
  const { contacts } = await contactsCollection.findOne({ userId: query });
  return contacts.emergency[0];
};
