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
    const userId = req.params.userId; // Assuming userId is passed as a parameter in the request
    console.log(userId)
    try {
        // Fetch posts for the specific userId and populate the Object_id field
        const posts = await PostModel.find({ Object_id: userId }).populate('Object_id');

        // Initialize an array to store all posts
        const allPosts = [];

        // Iterate through fetched posts and construct the desired format
        posts.forEach(post => {
            if (post.Object_id && post.posts && post.posts.length > 0) {
                post.posts.forEach(p => {
                    allPosts.push({
                        userId: userId,
                        post: {
                            post_id: p.post_id,
                            content: p.content,
                            imageURL: p.imageURL,
                            tags: p.tags,
                            like: p.like,
                            privacyLevel: p.privacyLevel,
                            comment: p.comment,
                            share: p.share,
                            mediaURL: p.mediaURL,
                            timestamp: p.timestamp,
                            _id: p._id
                        }
                    });
                });
            }
        });

        // Sorting posts by timestamp in descending order (newest to oldest)
        allPosts.sort((a, b) => new Date(b.post.timestamp) - new Date(a.post.timestamp));

        res.json(allPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
  
const getFollowingPosts = async (req, res) => {
    const userId = req.params.objectId;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const followingIds = user.followings.map(following => following.following_id);
  
      const posts = await PostModel.find({
        Object_id: { $in: followingIds },
      }).populate("Object_id");
  
      const allPosts = posts.reduce((acc, cur) => {
        if (cur.Object_id && cur.posts && cur.posts.length > 0) {
          cur.posts.forEach(post => {
            if (post.privacyLevel === 'Public' || post.privacyLevel === 'Following') {
              const userId = cur.Object_id && cur.Object_id._id ? cur.Object_id._id.toString() : null;
              acc.push({
                userId: userId,
                post: post
              });
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
  };
  
  
  

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
