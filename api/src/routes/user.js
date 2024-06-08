const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/:username', userController.getUser);
router.put('/:username', userController.updateUser);

module.exports = router;