const express = require('express');
const router = express.Router();
const { addComment } = require('../app/controllers/CommentController'); 

router.post('/', addComment); 

module.exports = router;