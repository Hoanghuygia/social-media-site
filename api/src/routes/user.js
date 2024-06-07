const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/', userController.showAll);

router.post('/', userController.addUser);

module.exports = router;