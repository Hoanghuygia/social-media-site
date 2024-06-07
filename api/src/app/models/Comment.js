const {default: mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        post_id: {type: mongoose.Types.ObjectId, ref: 'Post'},
        comments: [
            {
                comment_id: Number,
                username: String,
                content: String,
                like: Number,
                timestamp: {type: Date, default: Date.now}     
            }
        ]
    }
)

const CommentModel = mongoose.model("Comment", Comment);
module.exports = CommentModel;  