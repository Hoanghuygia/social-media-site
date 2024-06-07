const {default: mongoose} = require('mongoose');

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        username: {type: mongoose.Types.ObjectId, ref: 'Post'},
        posts: [
            {
                post_id: Number,
                content: String,
                imageURL: String,
                tags: String,
                like: Number,
                type: {
                    type: String,
                    enum: ['public', 'private', 'friend'],
                },
                comment: Number,
                share: Number,
                timestamp: {type: Date, default: Date.now}
            }
        ]
    }
)

const PostModel = mongoose.model("Post", Post);
module.exports = PostModel;