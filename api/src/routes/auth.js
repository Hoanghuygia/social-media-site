const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');

router.post('/register', authController.registerPost);
router.post('/login', authController.loginPost);


module.exports = router;