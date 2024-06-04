const express = require('express');
const router = express.Router();
const { addMessage, getMessage } = require('../app/controllers/MessageController'); 

router.post('/', addMessage); 
router.get('/', getMessage); 

module.exports = router;
