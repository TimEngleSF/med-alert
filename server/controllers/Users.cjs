const { Users } = require('../models/index.cjs');

module.exports = {
  getUser: async (req, res) => {
    res.send('GOT A USER!');
  },
  createUser: async (req, res) => {
    const { body } = req;
    try {
      const responseBody = await Users.createUser(body);
      // const responseBody = {
      //   user: { id: ids.userId, ...body.user },
      //   schedule: { id: ids.scheduleId, schedule: body.sched },
      // };
      res.status(201).send(responseBody);
    } catch (err) {
      res.status(400).send(err);
      throw err;
    }
  },
};
