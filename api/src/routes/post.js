const express = require('express');
const router = express.Router();
const { addPost } = require('../app/controllers/PostController'); 

router.post('/', addPost); 

module.exports = router;