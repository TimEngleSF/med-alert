const { Auth } = require('../models/index.cjs');

module.exports = {
  getAllUserInfo: async (req, res) => {
    const authUsername = req.user.username;
    const { username } = req.params;

    if (authUsername === username) {
      try {
        const responseBody = await Auth.getAllUserInfo(username);
        res.send(responseBody);
      } catch (err) {
        res.status(400).send(err);
      }
    } else {
      res.status(403).send({ msg: 'Not authorized to access this content' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const response = await Auth.login(email, password);
    res.status(response.code).send(response.data);
  },

  register: async (req, res) => {
    const { body } = req;
    try {
      const responseBody = await Auth.register(body);
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
