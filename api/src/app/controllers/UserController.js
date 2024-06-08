const User = require('../models/user');

class UserController {
    getUser = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      deleteUser = async (req, res) => {
        try {
          const deletedUser = await User.findOneAndDelete({ username: req.params.username });
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      // New functions

      getFollowers = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username }).populate('followers.follower_id', 'username');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user.followers);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      getFollowings = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username }).populate('followings.following_id', 'username');
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user.followings);
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      addFollower = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          const follower = await User.findById(req.body.follower_id);
          if (!user || !follower) {
            return res.status(404).json({ message: 'User or follower not found' });
          }
          user.followers.push({ follower_id: req.body.follower_id });
          await user.save();
          res.status(200).json({ message: 'Follower added successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      removeFollower = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.followers = user.followers.filter(follower => follower.follower_id.toString() !== req.body.follower_id);
          await user.save();
          res.status(200).json({ message: 'Follower removed successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      addFollowing = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          const following = await User.findById(req.body.following_id);
          if (!user || !following) {
            return res.status(404).json({ message: 'User or following not found' });
          }
          user.followings.push({ following_id: req.body.following_id });
          await user.save();
          res.status(200).json({ message: 'Following added successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

      removeFollowing = async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.followings = user.followings.filter(following => following.following_id.toString() !== req.body.following_id);
          await user.save();
          res.status(200).json({ message: 'Following removed successfully' });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };
}

module.exports = new UserController();
