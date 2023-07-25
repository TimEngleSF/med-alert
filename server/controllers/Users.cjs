const { Users } = require('../models/index.cjs');

module.exports = {
  getUser: async (req, res) => {
    res.send('GOT A USER!');
  },
  createUser: async (req, res) => {
    try {
      const userID = await Users.postUser(req.body);
      res.status(201).send(userID);
    } catch (err) {
      res.status(400).send(err);
      throw err;
    }
  },
};
