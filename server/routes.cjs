const express = require('express');
const router = express.Router();
const controllers = require('./controllers/index.cjs');

router.get('/user', controllers.Users.getUser);
router.post('/user', controllers.Users.createUser);

router.get('/scheds', controllers.Schedules.getSchedule);
router.post('/scheds', controllers.Schedules.postSchedule);

router.get('/contacts', controllers.Contacts.getContacts);
router.post('/contacts', controllers.Contacts.postContacts);

module.exports = router;
