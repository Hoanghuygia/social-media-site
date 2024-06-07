const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');
const { addMessage, getMessage } = require('../app/controllers/MessageController'); 

router.use(auth.verifyToken);

router.post('/', addMessage); 
router.get('/', getMessage); 

module.exports = router;
