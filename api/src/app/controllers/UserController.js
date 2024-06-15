const User = require("../models/user");
const Message = require('../models/Message');

class UserController {
    getUser = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const updateFields = { ...req.body };

            // Prevent updating username and email
            delete updateFields.username;
            delete updateFields.email;
            delete updateFields.followers;
            delete updateFields.followings;

            const updatedUser = await User.findOneAndUpdate(
                { username: req.params.username },
                { $set: updateFields },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete({
                username: req.params.username,
            });
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getFollowers = async (req, res) => {
        console.log(req.params.username);
        try {
          const user = await User.findOne({ username: req.params.username }).populate("followings.following_id", "username");;
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json(user.followers );
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
      
      getUsersList = async (req, res) => {
        try {
            const users = await User.find({}, 'username firstName lastName profilePicture');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };


    getFollowings = async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.params.username,
            }).populate("followings.following_id", "username");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user.followings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    addFollowing = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            const following = await User.findById(req.body.following_id);
            if (!user || !following) {
                return res
                    .status(404)
                    .json({ message: "User or following not found" });
            }

            user.followings.push({ following_id: req.body.following_id });

            following.followers.push({ follower_id: user._id });

            await user.save();
            await following.save();

            res.status(200).json({ message: "Following added successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    removeFollowing = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            const following = await User.findById(req.body.following_id);
            if (!user || !following) {
                return res
                    .status(404)
                    .json({ message: "User or following not found" });
            }

            user.followings = user.followings.filter(
                (following) =>
                    following.following_id.toString() !== req.body.following_id
            );

            following.followers = following.followers.filter(
                (follower) =>
                    follower.follower_id.toString() !== user._id.toString()
            );

            await user.save();
            await following.save();

            res.status(200).json({ message: "Following removed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    removeFollower = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            const follower = await User.findById(req.body.follower_id);
            if (!user || !follower) {
                return res
                    .status(404)
                    .json({ message: "User or follower not found" });
            }

            user.followers = user.followers.filter(
                (follower) =>
                    follower.follower_id.toString() !== req.body.follower_id
            );

            follower.followings = follower.followings.filter(
                (following) =>
                    following.following_id.toString() !== user._id.toString()
            );

            await user.save();
            await follower.save();

            res.status(200).json({ message: "Follower removed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    getUserById = async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { password, __v, ...otherUserData } = user._doc;

            res.status(200).json(otherUserData);
        } catch (error) {
            console.log("Error when finding user by id" + error);
            return res.status(500).json({ message: error.message });
        }
    };

    getChaList = async (req, res) => {
        console.log("huy dep trai");
        try {
            const { userId } = req.params;

            const user = await User.findById(userId).populate(
                "chat_list",
                "firstName lastName profilePicture status"
            );

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            let response = [];

            for (let chatUser of user.chat_list) {
                const message = await Message.findOne({
                    $or: [
                        { user_id_1: userId, user_id_2: chatUser._id },
                        { user_id_1: chatUser._id, user_id_2: userId },
                    ],
                })
                    .sort({ "messages.timestamp": -1 })
                    .limit(1)
                    .select("messages")
                    .lean();

                const lastMessage =
                    message && message.messages.length > 0
                        ? message.messages[message.messages.length - 1].content
                        : "";

                response.push({
                    recepientId: chatUser._id,
                    avatar: chatUser.profilePicture,
                    status: chatUser.status,
                    name: `${chatUser.firstName} ${chatUser.lastName}`,
                    lastMessage: lastMessage,
                });
            }

            res.json(response);
        } catch (error) {
            console.error("Error fetching chat list:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };
}

module.exports = new UserController();
