const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');
const { addMessage, getMessage, getRecentChatPairById } = require('../app/controllers/MessageController'); 

router.use(auth.verifyToken);

router.post('/', addMessage); 
router.get('/', getMessage); 
router.get('/:senderID', getRecentChatPairById); 

module.exports = router;
