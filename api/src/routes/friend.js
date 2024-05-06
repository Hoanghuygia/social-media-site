const express = require('express');
const router = express.Router();

const friendController = require('../app/controllers/FriendController');

router.get('/:slug', friendController.show);

router.get('/', friendController.showAll); //note the order of route

module.exports = router;