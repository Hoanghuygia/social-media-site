const User = require("../models/user");

async function getUserById(req, res){
    const {id} = req.params;

    try{
        const user = await User.findById(id);
        
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const { password, __v, ...otherUserData } = user._doc;

        res.status(200).json(otherUserData);
    }catch(error){
        console.log('Error when finding user by id' + error);
        return res.status(500).json({message: error.message});
    }
}

module.exports = { getUserById };
