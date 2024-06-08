const express = require('express');
const router = express.Router();
const { getUserById } = require('../app/controllers/UserController'); 

<<<<<<< HEAD
const userController = require('../app/controllers/UserController');

router.get('/:username', userController.getUser);
router.put('/:username', userController.updateUser);
=======
router.get('/:id', getUserById);
>>>>>>> master

module.exports = router;