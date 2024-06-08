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
}

module.exports = { getUserById };
