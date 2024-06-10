const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');
const { getUserById, getChatList } = require('../app/controllers/UserController'); 

router.use(auth.verifyToken);

router.get('/:id', getUserById);
router.get('/chatlist/:userId', getChatList);

module.exports = router;