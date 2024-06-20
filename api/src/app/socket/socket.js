const User = require("../models/user");
const Notification = require("../models/Notification");

async function onConnected(io, socket) {
    const { userID } = socket.handshake.query;
    console.log("Socket: ", socket.id);

    if (!userID || typeof userID !== "string" || userID.length !== 24) {
        console.log("Invalid ID format");
        return;
    }

    try {
        await User.findByIdAndUpdate(
            userID,
            {
                socket_id: socket.id,
                status: "Online",
            },
            { new: true }
        );
    } catch (e) {
        console.log("Error in set socket");
    }

    socket.on("send-notification", async (notification) => {
        try {
            const thumperID = notification.senderID;
            const userID = notification.userID;

            const userNotifications = await Notification.findOne({
                user_id: userID,
            })
                .select("content")
                .lean();
            const currentNotificationLengthById = userNotifications
                ? userNotifications.content.length
                : 0;

            const thumper = await User.findById(thumperID);
            // console.log("Thumper: ", thumper);

            const toSocketUser = await User.findById(userID)
                .select("socket_id")
                .lean();
            const toSocketID = toSocketUser ? toSocketUser.socket_id : null;
            console.log("To Socket: ", toSocketID);

            const packageNotification = {
                avatar: thumper.profilePicture,
                name: `${thumper.firstName} ${thumper.lastName}`,
                content: notification.contentNotification,
                read: false,
                notificationID: currentNotificationLengthById,
            };
            console.log("Notification package: ", packageNotification);

            if (toSocketID) {
                io.to(toSocketID).emit("new-notification", packageNotification);
            }
        } catch (error) {
            console.log("Error in send-message event:", error);
        }
    });

    socket.on("send-message", async (message) => {
        try {
            const senderID = message.userId1;
            const recepientID = message.userId2;

            const senderUser = await User.findById(senderID)
                .select("username")
                .lean();
            const senderUsername = senderUser ? senderUser.username : null;

            const packageMessage = {
                content: message.content,
                imageURL: message.imageURL,
                username: senderUsername,
                recepientID: recepientID,
            };

            const toSocketUser = await User.findById(recepientID)
                .select("socket_id")
                .lean();
            const toSocketID = toSocketUser ? toSocketUser.socket_id : null;

            const fromSocketUser = await User.findById(senderID)
                .select("socket_id")
                .lean();
            const fromSocketID = fromSocketUser
                ? fromSocketUser.socket_id
                : null;

            if (toSocketID) {
                io.to(toSocketID).emit("new-message", packageMessage);
            }

            if (fromSocketID) {
                io.to(fromSocketID).emit("verify-sent", {
                    message: "Sent message successfully",
                });
            }
        } catch (error) {
            console.log("Error in send-message event:", error);
        }
    });

    socket.on("disconnect", async () => {
        // const chatlist = User.findById(userID);
        // console.log("Chatlist: ", chatlist);
        //mình dự định sẽ gửi tới danh sách chat list, nhung có vẻ cần thêm time
        try {
            await User.findByIdAndUpdate(userID, {
                status: "Offline",
            });
        } catch (e) {
            console.log(e);
        }
        console.log("Socket disconnected", socket.id);
    });
}

module.exports = { onConnected };
