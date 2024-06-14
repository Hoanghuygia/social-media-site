const PostModel = require("../models/Post");
const UserModel = require("../models/user");
const { shuffle } = require('lodash'); 


async function addPost(req, res) {
    const { Object_id, posts } = req.body;
    try {
        const user = await UserModel.findById(Object_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const username = user.username;

        for (const post of posts) {
            const { content, imageURL, mediaURL, privacyLevel } = post;

            if (!['Public', 'Following', 'Private'].includes(privacyLevel)) {
                return res.status(400).json({ message: 'Invalid privacyLevel value' });
            }

            const filter = { Object_id: Object_id }; 
            const bucket = await PostModel.findOne(filter);

            let postId;

            if (bucket) {
                postId = bucket.posts.length + 1;
            } else {
                postId = 1;
            }

            const timestamp = new Date();
            timestamp.setHours(timestamp.getHours() + 7);

            const newPost = {
                post_id: postId,
                username: username,
                content: content,
                imageURL: imageURL,
                mediaURL: mediaURL,
                privacyLevel: privacyLevel,
                like: 0,
                comment: 0,
                share: 0,
                timestamp: timestamp
            };

            const update = { $push: { posts: newPost } };
            const options = { upsert: true, new: true };

            await PostModel.findOneAndUpdate(filter, update, options);
        }

        return res.status(200).json({ message: 'Posts added successfully' });
    } catch (error) {
        console.error("Error adding posts: ", error);
        return res.status(500).json({ message: error.message });
    }
}




//undone
async function updatePost(req, res) {
    const objectId = req.params.objectId;
    const postId = req.params.postId;
    const updateData = req.body; // This should contain the fields to be updated

    try {
        // Find the post by Object_id and postId
        const updatedPost = await PostModel.findOneAndUpdate(
            { 'Object_id': objectId, 'posts._id': postId },
            {
                $set: {
                    'posts.$.content': updateData.content,
                    'posts.$.privacyLevel': updateData.privacyLevel,
                    'posts.$.imageURL': updateData.imageURL,
                    'posts.$.mediaURL': updateData.mediaURL,
                }
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        console.error("Error updating the post: ", error);
        res.status(500).json({ message: "Error updating the post" });
    }
}



async function deletePost(req, res) {
    const objectId = req.params.objectId;
    const postId = req.params.postId;

    try {
        // Find the post by Object_id
        const post = await PostModel.findOneAndUpdate(
            { 'Object_id': objectId, 'posts._id': postId },
            { $pull: { 'posts': { _id: postId } } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost: post });
    } catch (error) {
        console.error("Error deleting the post: ", error);
        res.status(500).json({ message: "Error deleting the post" });
    }
}

async function getAllPostsByUser(req, res) {
    const Object_id = req.params.Object_id;
    console.log(Object_id);
    try {
        const posts = await PostModel.find({ Object_id }).populate({
            path: 'Object_id',
            select: 'username' // specify the fields you want to include
        });
        console.log(posts);
  
        if (!posts.length) {
            return res.status(404).json({ message: "User not found or no posts available" });
        }
  
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


  
async function getFollowingPosts(req, res) {
    const userId = req.params.objectId;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const followingIds = user.followings.map(following => following.following_id);

        const posts = await PostModel.find({
            "Object_id": { $in: followingIds },
        }).populate("Object_id");

        const allPosts = posts.reduce((acc, cur) => {
            if (cur.posts && cur.posts.length > 0) {
                cur.posts.forEach(post => {
                    if (post.privacyLevel === 'Public' || post.privacyLevel === 'Following') {
                        acc.push(post);
                    }
                });
            }        
            return acc;
        }, []);

        const shuffledPosts = shuffle(allPosts);

        res.json(shuffledPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getPostsWithImageURL(req, res) {
    try {
        const result = await PostModel.aggregate([
            { $unwind: '$posts' },
            { $match: { 'posts.imageURL': { $exists: true, $ne: null } } },
            { $group: { _id: null, posts: { $push: '$posts' } } }, // Group without _id
            { $project: { _id: 0, posts: 1 } } // Project to exclude _id and include only 'posts'
        ]);

        console.log("Result from aggregation:", result);

        if (result.length === 0 || !result[0].posts.length) {
            return res.status(404).json({ message: 'No posts found with imageURL' });
        }

        const shuffledPosts = shuffle(result[0].posts);
        res.json(shuffledPosts); 
    } catch (error) {
        console.error("Error fetching posts with imageURL:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

  

async function getPostsWithMediaURL(req, res) {
    try {
        const result = await PostModel.aggregate([
            { $unwind: '$posts' },
            { $match: { 'posts.mediaURL': { $exists: true, $ne: null } } },
            { $group: { _id: null, posts: { $push: '$posts' } } }, // Group without _id
            { $project: { _id: 0, posts: 1 } } // Project to exclude _id and include only 'posts'
        ]);

        console.log("Result from aggregation:", result);

        if (result.length === 0 || !result[0].posts.length) {
            return res.status(404).json({ message: 'No posts found with imageURL' });
        }

        const shuffledPosts = shuffle(result[0].posts);
        res.json(shuffledPosts); 
    } catch (error) {
        console.error("Error fetching posts with mediaURL:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getAllPostsByUser,
  getFollowingPosts,
  getPostsWithImageURL,
  getPostsWithMediaURL
};
