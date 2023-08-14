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
};
