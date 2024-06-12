const { default: mongoose} = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema(
    {
        user_id_1 : {type: mongoose.Types.ObjectId, ref: 'User'},
        user_id_2 : {type: mongoose.Types.ObjectId, ref: 'User'},
        messages: [
            {
                message_id: Number,
                username: String,
                content: String,
                imageURL: String,
                timestamp: { type: Date, default: Date.now }
            }
        ],
        timestamp: {type: Date, default: Date.now}
    }
)

const MessageModel = mongoose.model('Message', Message);

module.exports = MessageModel;