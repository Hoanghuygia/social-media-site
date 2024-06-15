const express = require('express');
const router = express.Router();
const auth = require('./../app/controllers/middlewareController');

router.use(auth.verifyToken);


const userController = require('../app/controllers/UserController');

router.get('/:username', userController.getUser);
router.put('/:username', userController.updateUser);

router.get('/:username/followers', userController.getFollowers);
router.get('/:username/followings', userController.getFollowings);


router.delete('/:username/followers', userController.removeFollower);
router.post('/:username/followings', userController.addFollowing);
router.delete('/:username/followings', userController.removeFollowing);

router.get('/id/:id', userController.getUserById);
router.get('/chatlist/:userId', userController.getChaList);

module.exports = router;