const express = require('express');
const router = express.Router();
const { addMessage } = require('../app/controllers/MessageController'); // Ensure this path is correct

router.post('/', addMessage); // Ensure this matches your intended endpoint

module.exports = router;
