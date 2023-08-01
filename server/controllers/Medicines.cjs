const { Medicines } = require('../models/index.cjs');
module.exports = {
  updateTaken: async (req, res) => {
    const { id, boolean } = req.body;

    try {
      const data = await Medicines.updateTaken(id, boolean);

      res.send(data);
    } catch (err) {
      console.error(err);
    }
  },
};
