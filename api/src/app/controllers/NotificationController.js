const NotificationModel = require("../models/Notification");

async function addNotification(req, res) {
    const { userID, contentNotification, senderID } = req.body;

    try {
        let notification = await NotificationModel.findOne({ user_id: userID });

        if (!notification) {
            notification = new NotificationModel({
                user_id: userID,
                content: [],
            });
        }

        const notification_id = notification.content.length + 1;

        const newNotification = {
            notification_id,
            sender_id: senderID,
            contentNot: contentNotification,
            read: false,
            timestamp: new Date(),
        };

        notification.content.push(newNotification);

        await notification.save();

        res.status(201).json({
            message: "Notification added successfully",
            notification,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to add notification", error });
    }
}

async function getNotification(req, res) {
    const { user_id } = req.params;

    try {
        const notification = await NotificationModel.findOne({
            user_id,
        }).populate("content.sender_id");

        if (!notification) {
            return res
                .status(200)
                .json([]);
        }

        notification.content.sort((a, b) => b.timestamp - a.timestamp);

        res.status(200).json(notification.content);
    } catch (error) {
        res.status(500).json({ message: "Failed to get notifications", error });
    }
}

async function setRead(req, res) {
    const { user_id, notification_id } = req.body;

    try {
        const notification = await NotificationModel.findOne({ user_id });

        if (!notification) {
            return res
                .status(404)
                .json({ message: "No notifications found for this user." });
        }

        const contentNotification = notification.content.find(
            (n) => n.notification_id === notification_id
        );

        if (!contentNotification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        contentNotification.read = true;

        await notification.save();

        res.status(200).json({
            message: "Notification marked as read successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update notification",
            error,
        });
    }
}

module.exports = { addNotification, getNotification, setRead };
