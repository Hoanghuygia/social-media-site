const User = require("../models/user");
const Message= require("../models/Message");

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

async function getChatList(req, res){
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('chat_list', 'firstname lastname profilePicture status');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let response = [];

        for (let chatUser of user.chat_list) {
            const message = await Message.findOne({
                $or: [
                    { user_id_1: userId, user_id_2: chatUser._id },
                    { user_id_1: chatUser._id, user_id_2: userId }
                ]
            }).sort({ 'messages.timestamp': -1 }).limit(1).select('messages').lean();

            const lastMessage = message && message.messages.length > 0
                ? message.messages[message.messages.length - 1].content
                : '';

            response.push({
                recepientId: chatUser._id,
                avatar: chatUser.profilePicture,
                status: chatUser.status,
                name: `${chatUser.firstname} ${chatUser.lastname}`,
                lastMessage: lastMessage,
            });
        }

        res.json(response);
    } catch (error) {
        console.error("Error fetching chat list:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getUserById, getChatList};
