const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');


router.get('/images', postController.getPostsWithImageURL);
router.get('/medias', postController.getPostsWithMediaURL);

router.post('/', postController.addPost); 

router.get('/:Object_id', postController.getAllPostsByUser);
router.get('/followings/:objectId', postController.getFollowingPosts);
router.delete('/:objectId/:postId', postController.deletePost);
router.put('/:objectId/:postId', postController.updatePost);




module.exports = router;