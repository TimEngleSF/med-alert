const express = require('express');
const router = express.Router();
const { Auth } = require('./controllers/index.cjs');
const passport = require('passport');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('hello!', req.user.email);
    return next();
  }
  res.redirect('/login');
};

router.get('/userInfo/:email', ensureAuthenticated, Auth.getAllUserInfo);

module.exports = router;
