const storyModel = require('../models/Story');

// Create a scheduled post
async function createStory(req, res) {
    const { content, scheduledAt, imageURL, mediaURL } = req.body;

    try {
        const newStory = new storyModel({
            content,
            scheduledAt,
            imageURL,
            mediaURL,
        });

        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        console.error("Error creating story post:", error);
        res.status(500).json({ message: "Failed to create story post" });
    }
}



module.exports = {
    createStory
};
