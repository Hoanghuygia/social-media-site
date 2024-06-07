const PostModel = require('../models/Post');

async function addPost(req, res){
    const {username, content, imageURL, tag, like, type, comment, share} = req.body;
    try{
        const filter = {username: username};
        const bucket = await PostModel.findOne(filter);
        console.log("post");

        let postId;

        if(bucket){
            postId = bucket.posts.length + 1;
        }
        else{
            postId = 1;
        }

        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 7);

        const post = {
            post_id: postId,
            content,
            imageURL,
            tag,
            like,
            type,
            comment,
            share,
            timestamp
        }

        const update = {$push: {posts: post}};
        const options = { upsert: true, new: true};

        const result = await PostModel.findOneAndUpdate(filter, update, options);
        return res.status(200).json(result);
    } catch(error){
        console.error('Error adding a post: ', error);
        return res.status(500).json({message: error.message})
    }
}

module.exports = { addPost };