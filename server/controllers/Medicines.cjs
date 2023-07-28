const { Medicines } = require('../models/index.cjs');
module.exports = {
  updateTaken: async (req, res) => {
    const { id, boolean } = req.body;
    console.log(id);

    try {
      const data = await Medicines.updateTaken(id, boolean);

      console.log(data);
      res.send(data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
