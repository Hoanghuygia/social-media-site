const PostModel = require("../models/Post");
const UserModel = require("../models/user");

async function addPost(req, res) {
    const { Object_id, content, imageURL, mediaURL, privacyLevel, tag } = req.body;
    try {
        console.log(Object_id)
      const user = await UserModel.findById(Object_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const username = user.username;
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
  
      const post = {
        post_id: postId,
        username,
        content,
        imageURL,
        mediaURL,
        tag,
        privacyLevel,
        timestamp, 
      };
  
      const update = { $push: { posts: post } };
      const options = { upsert: true, new: true };
  
      const result = await PostModel.findOneAndUpdate(filter, update, options);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error adding a post: ", error);
      return res.status(500).json({ message: error.message });
    }
  }

//undone
  async function updatePost(req, res) {
  const postId = req.params.postId;
  const updateData = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

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
        // Find the user by userId
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract the followingIds from the user's followings
        const followingIds = user.followings.map(following => following.following_id);

        // Find the posts of the users the current user is following
        const posts = await PostModel.find({
            "Object_id": { $in: followingIds }, 
            "posts.privacyLevel": { $in: ["public", "following"] }
        }).populate("Object_id");
        
    console.log(posts)

        // Flatten the posts array to include all posts
        const allPosts = posts.reduce((acc, cur) => {
            acc.push(...cur.posts);
            return acc;
        }, []);

        res.json(allPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getRandomPublicPostsWithPictures() {
  try {
    const posts = await PostModel.aggregate([
      {
        $match: {
          privacyLevel: "public",
          pictures: { $exists: true, $not: { $size: 0 } },
        },
      },
      {
        $addFields: {
          randomOrder: { $rand: {} },
        },
      },

      { $sort: { randomOrder: 1 } },
    ]);

    return posts;
  } catch (error) {
    console.error(
      "Error getting random posts with pictures and public privacy level: ",
      error
    );
    throw error;
  }
}

async function getRandomPublicPostsWithMedia() {
  try {
    const posts = await PostModel.aggregate([
      {
        $match: {
          privacyLevel: "public",
          media: { $exists: true, $ne: "" },
        },
      },
      {
        $addFields: {
          randomOrder: { $rand: {} },
        },
      },
      { $sort: { randomOrder: 1 } },
    ]);

    return posts;
  } catch (error) {
    console.error("Error getting random public media posts: ", error);
    throw error;
  }
}

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getAllPostsByUser,
  getFollowingPosts,
  getRandomPublicPostsWithMedia,
  getRandomPublicPostsWithPictures,
};
