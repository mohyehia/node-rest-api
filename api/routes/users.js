const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userController = require('../controller/users.controller');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.delete('/:userId', checkAuth, userController.removeUser);

module.exports = router;