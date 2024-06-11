const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        Object_id: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        posts: [
            {
                post_id: Number,
                content: String,
                imageURL: String,
                tags: String,
                like: Number,
                privacyLevel: {
                    type: String,
                    enum: ['public', 'private', 'following'],
                },
                comment: Number,
                share: Number,
                mediaURL: String,
                timestamp: { type: Date, default: Date.now }
            }
        ]
    }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
