const CommentModel = require('../models/Comment');

async function addComment(req, res){
    const { postId, username, content, like } = req.body;
    try {

        const filter = { post_id: postId };
        const bucket = await CommentModel.findOne(filter);
        console.log("comment");

        let commentID;

        if (bucket) {
            commentID = bucket.comments.length + 1;
        } else {           
            commentID = 1;
        }

        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 7);

        const comment = {
            comment_id: commentID,
            username: username,
            content: content,
            like: like,
            timestamp: timestamp
        };

        const update = { $push: { comments: comment } };
        const options = { upsert: true, new: true };

        const result = await CommentModel.findOneAndUpdate(filter, update, options);
        return res.status(200).json(result);

    } catch (error) {
        console.error('Error adding message:', error);
        return res.status(500).json({message: error.message})
    }
}

module.exports = { addComment };
