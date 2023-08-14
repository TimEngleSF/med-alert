const express = require('express');
const guestRouter = express.Router();
const { Guest } = require('../controllers/index.cjs');

guestRouter.get('/:username', Guest.getAllUserInfo);

module.exports = guestRouter;
