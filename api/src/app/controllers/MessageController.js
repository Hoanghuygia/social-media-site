const { default: mongoose} = require('mongoose');
const MessageModel = require("../models/Message");

async function addMessage(req, res) {
    const { userId1, userId2, username, content, imageURL } = req.body;
    try {
        const filter = {
            $or: [
                { user_id_1: userId1, user_id_2: userId2 },
                { user_id_1: userId2, user_id_2: userId1 }
            ]
        };

        const bucket = await MessageModel.findOne(filter);
        // console.log("message");

        let message_id;

        if (bucket) {
            message_id = bucket.messages.length + 1;
        } else {
            message_id = 1;
        }

        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 7);

        const message = {
            message_id: message_id,
            username: username,
            content: content,
            imageURL: imageURL,
            timestamp: timestamp,
        };

        const update = { $push: { messages: message } };
        const options = { upsert: true, new: true };

        const result = await MessageModel.findOneAndUpdate(
            filter,
            update,
            options
        );
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error adding message:", error);
        return res.status(500).json({ message: error.message });
    }
}

async function getMessage(req, res) {
    const { userId1, userId2 } = req.query;

    if (!userId1 || !userId2) {
        return res
            .status(400)
            .json({ message: "userId1 and userId2 are required" });
    }

    const query = {
        $or: [
            { user_id_1: userId1, user_id_2: userId2 },
            { user_id_1: userId2, user_id_2: userId1 },
        ],
    };

    const projection = { messages: 1, _id: 0 };

    try {
        const messages = await MessageModel.findOne(query, projection);

        if (!messages) {
            return res.status(200).json([]);
        }

        return res.status(200).json(messages.messages);
    } catch (error) {
        console.error("Error get messages: ", error);

        return res.status(500).json({ message: error.message });
    }
}

async function getRecentChatPairById(req, res) {
    const { senderID } = req.params;
    try {
        const recentChatPair = await MessageModel.findOne({
            $or: [
                { user_id_1: new mongoose.Types.ObjectId(senderID) },
                { user_id_2: new mongoose.Types.ObjectId(senderID) }
            ]
        }).sort({ timestamp: -1 }).exec();

        if (recentChatPair) {
            return res.status(200).json(recentChatPair);
        } else {
            return res.status(404).json({ message: "Pair not found" });
        }
    } catch (error) {
        console.error("Error getting the last chat id: " + error);
        return res.status(500).json({ message: error.message });
    }
}



module.exports = { addMessage, getMessage, getRecentChatPairById };
