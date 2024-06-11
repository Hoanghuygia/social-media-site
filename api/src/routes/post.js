const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');



router.get('/:userId', postController.getAllPostsByUser);
router.post('/', postController.addPost); 
router.get('followings/:userId', postController.getFollowingPosts);


module.exports = router;