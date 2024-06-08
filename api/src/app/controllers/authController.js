const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


exports.registerPost = async (req, res) => {
    try {
      const { username, email, password, firstName, lastName, gender, dob } = req.body;
  
      if (!username || !email || !password || !firstName || !lastName || !gender || !dob) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const validGenders = ["male", "female", "other"];
      if (!validGenders.includes(gender)) {
        return res.status(400).json({ message: "Invalid gender" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender,
        dob,
      });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.loginPost = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("Wrong Email!");
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            res.status(404).json("wrong password");
        }
        if (user && validPassword) {
            const Token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "24h" }
            );
            const {profilePicture, coverPicture, followers, followings,...others} = user._doc;
            res.status(200).json({...others, Token });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

