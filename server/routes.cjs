const express = require('express');
const router = express.Router();
const controllers = require('./controllers/index.cjs');

router.get('/userLogin/:email', controllers.CreateLoginUser.getAllUserInfo);
router.post('/userCreate/', controllers.Users.createUser);

router.get('/scheds', controllers.Schedules.getSchedule);
router.post('/scheds', controllers.Schedules.postSchedule);

// router.get('/contacts', controllers.Contacts.getContacts);
// router.post('/contacts', controllers.Contacts.postContacts);

module.exports = router;
