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
  const postId = req.params.postId;
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting the post: ", error);
    res.status(500).json({ message: "Error deleting the post" });
  }
}

async function getAllPostsByUser(req, res) {
  const userId = req.params.userId;
  try {
    // Find the user's posts
    const userPosts = await PostModel.findOne({ username: userId }).populate(
      "username"
    );

    if (!userPosts) {
      return res
        .status(404)
        .json({ message: "User not found or no posts available" });
    }

    res.json(userPosts.posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getFollowingPosts(req, res) {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId).populate(
      "followings.following_id"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingIds = user.followings.map(
      (following) => following.following_id._id
    );

    // Find posts of followed users with privacy level 'public' or 'friend'
    const posts = await PostModel.find({
      username: { $in: followingIds },
      "posts.privacyLevel": { $in: ["public", "friend"] },
    }).populate("username");

    // Extract the posts array from each user's document
    const allPosts = [];
    posts.forEach((userPosts) => {
      userPosts.posts.forEach((post) => {
        if (post.privacyLevel === "public" || post.privacyLevel === "friend") {
          allPosts.push(post);
        }
      });
    });

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
