const { CreateLoginUser } = require('../models/index.cjs');

module.exports = {
  getAllUserInfo: async (req, res) => {
    const { email } = req.params;
    try {
      const responseBody = await CreateLoginUser.getAllUserInfo(email);
      res.send(responseBody);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  createUser: async (req, res) => {
    const { body } = req;
    try {
      const responseBody = await CreateLoginUser.createUser(body);
      if (!responseBody) {
        res.status(400).send({ msg: 'User already exists!' });
      } else {
        res.status(201).send(responseBody);
      }
      // const responseBody = {
      //   user: { id: ids.userId, ...body.user },
      //   schedule: { id: ids.scheduleId, schedule: body.sched },
      // };
    } catch (err) {
      res.status(400).send(err);
      throw err;
    }
  },
};
