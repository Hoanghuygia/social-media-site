const express = require('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');
const auth = require('./../app/controllers/middlewareController');

router.use(auth.verifyToken);

router.get('/images', postController.getPostsWithImageURL);
router.get('/', postController.getAllPublicPosts);

router.post('/', postController.addPost); 

router.get('/:userId', postController.getAllPostsByUser);
router.get('/followings/:objectId', postController.getFollowingPosts);

router.delete('/:objectId/:postId', postController.deletePost);
router.put('/:objectId/:postId', postController.updatePost);

router.post("/like", postController.likePost);
router.post("/dislike", postController.dislikePost);




module.exports = router;