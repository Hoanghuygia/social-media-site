const express = require('express');
const router = express.Router();
const { getUserById } = require('../app/controllers/UserController'); 

router.get('/:id', getUserById);

module.exports = router;