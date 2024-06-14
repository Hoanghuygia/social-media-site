const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');



router.get('/:Object_id', postController.getAllPostsByUser);
router.post('/', postController.addPost); 
router.get('/followings/:objectId', postController.getFollowingPosts);
router.delete('/:objectId/:postId', postController.deletePost);
router.get('/images', postController.getPostsByImageURL);



module.exports = router;