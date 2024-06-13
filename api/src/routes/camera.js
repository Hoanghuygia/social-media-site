const express = require('express');
const router = express.Router();
const { openCamera } = require('../app/controllers/CameraController'); 

router.get('/', openCamera); 

module.exports = router;