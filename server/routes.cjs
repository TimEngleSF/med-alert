const express = require('express');
const router = express.Router();
const { Auth } = require('./controllers/index.cjs');
// const passport = require('passport');

// const ensureAuthenticated = (req, res, next) => {
//   console.log('check');
//   console.log(req.headers);
//   if (req.isAuthenticated()) {
//     console.log('hello!', req.user.email);
//     return next();
//   }
//   console.log('Authenticated? ', req.isAuthenticated());
//   res.status(400);
//   next();
// };

router.get('/userInfo/:username', Auth.getAllUserInfo);

module.exports = router;
