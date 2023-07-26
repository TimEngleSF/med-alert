const passport = require('passport');
const { Strategy } = require('passport-local');
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

passport.serializeUser((user, done) => {
  console.log('Serializing User...');
  // console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log('Deserializing User...');
  const objId = new ObjectId(id);
  console.log(objId);

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    // console.log(user);
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    /// this option object sets the loggin user name from request object to look at the email field
    {
      usernameField: 'email',
    },
    // This is where the work is being done
    async (email, password, done) => {
      console.log(email);
      console.log(password);

      try {
        // Validation
        if (!email || !password) {
          throw new Error('Bad Request. Missing credentials');
        }
        ///////// Continue
        const userDB = await usersCollection.findOne({ email });
        // Does user exist?
        if (!userDB) throw new Error('User not found');
        // Continue if so
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log('Authenticated');
          done(null, userDB);
        } else {
          console.log('Invalid Login');
          done(null, null);
        }
      } catch (err) {
        console.error(err);
        done(err, null);
      }
    }
  )
);
