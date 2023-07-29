const express = require('express');
const router = express.Router();
const { Auth, Medicines } = require('./controllers/index.cjs');

router.get('/userInfo/:username', Auth.getAllUserInfo);

router.put('/medicines', Medicines.updateTaken);

module.exports = router;
