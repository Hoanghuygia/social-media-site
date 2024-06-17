const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');
const { addNotification, getNotification, setRead } = require('../app/controllers/NotificationController'); 

router.use(auth.verifyToken);

router.post('/', addNotification); 
router.get('/:user_id', getNotification); 
router.post('/setRead', setRead); 

module.exports = router;