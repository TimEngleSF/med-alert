const express = require('express');
const router = express.Router();
const { Auth } = require('../controllers/index.cjs');
// const passport = require('passport');

router.post('/register/', Auth.register);
// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('Logged In');
//   res.send(200);
// });

module.exports = router;
