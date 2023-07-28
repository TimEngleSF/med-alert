const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  },

  // If this returns true then passwords are the same
  comparePassword: (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
  },
};
