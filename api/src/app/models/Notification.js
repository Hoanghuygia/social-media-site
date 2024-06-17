const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Notification = new Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    content: [
        {
            notification_id: {
                type: Number,
                required: true,
                index: true,
            },
            sender_id: { type: mongoose.Types.ObjectId, ref: "User" },
            contentNot: String,
            read: {
                type: Boolean,
                default: false,
            },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const NotificationModel = mongoose.model("Notification", Notification);

module.exports = NotificationModel;
