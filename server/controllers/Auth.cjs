const { Auth } = require('../models/index.cjs');

module.exports = {
  getAllUserInfo: async (req, res) => {
    const { username } = req.params;
    try {
      const responseBody = await Auth.getAllUserInfo(username);
      res.send(responseBody);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const response = await Auth.login(email, password);
    res.status(response.code).send(response.data);
  },

  register: async (req, res) => {
    const { body } = req;
    try {
      const responseBody = await Auth.register(body);
      console.log('CONTROLLERS', responseBody);
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
    }
  },
};
