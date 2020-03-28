const authenticaitonPolicy = require('../policies/authentication.policy');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/register', authenticaitonPolicy.register, usersController.register);

module.exports = router;
