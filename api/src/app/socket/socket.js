const User = require("../models/user");

async function onConnected(io, socket) {
    const { userID } = socket.handshake.query;

    // console.log("UserID", userID);

    if (!userID || typeof userID !== "string" || userID.length !== 24) {
        console.log("Invalid ID format");
        return
    }
    else{
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
            console.log(e);
        }

        socket.on("send-message", async (message) => {
            const senderID = message.userId1;
            const recepientID = message.userId2;

        const senderUsername = await User.findById(senderID)
            .select("username")
            .lean();

        const packageMessage = {
            content: message.content,
            imageURL: message.imageURL,
            username: senderUsername.username,
            recepientID: recepientID,
        };

            const toSocketObject = await User.findById(recepientID)
                .select("socket_id")
                .lean();
            const toSocketID = toSocketObject ? toSocketObject.socket_id : null;

            const fromSocketObject = await User.findById(senderID)
                .select("socket_id")
                .lean();
            const fromSocketID = fromSocketObject
                ? fromSocketObject.socket_id
                : null;

            io.to(toSocketID).emit("new-message", packageMessage);

        io.to(fromSocketID).emit("verify-sent", {
            message: "Sent message succesfully",
        });
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    });
}
module.exports = { onConnected };

module.exports = { onConnected };
