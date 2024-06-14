const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: true,
        default: Date.now,
        index: { expires: '24h' } // Automatically expire document after 24 hours
    },
    imageURL: {
        type: String,
    },
    mediaURL: {
        type: String,
    },
    // Add other fields as needed
}, { timestamps: true });

module.exports = mongoose.model("Story", StorySchema);
