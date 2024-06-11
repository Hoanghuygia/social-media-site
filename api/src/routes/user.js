const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');
const { getUserById, getChatList } = require('../app/controllers/UserController'); 

router.use(auth.verifyToken);


const userController = require('../app/controllers/UserController');

router.get('/:username', userController.getUser);
router.put('/:username', userController.updateUser);

router.get('/:username/followers', userController.getFollowers);
router.get('/:username/followings', userController.getFollowings);


router.delete('/:username/followers', userController.removeFollower);
router.post('/:username/followings', userController.addFollowing);
router.delete('/:username/followings', userController.removeFollowing);

module.exports = router;