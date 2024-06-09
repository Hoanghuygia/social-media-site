const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");


exports.registerPost = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
            lastname: req.body.lastname,
            firstname: req.body.firstname
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};

exports.loginPost = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json("Wrong Username!");
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
                { expiresIn: "1y" }
            );
            const {profilePicture, coverPicture, followers, followings,...others} = user._doc;
            res.status(200).json({...others, Token });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}

