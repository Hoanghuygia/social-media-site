const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const route = require("./routes/index");
const db = require("./config/db");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");
const User = require("./app/models/user");
// const {onConnected} = require ("./app/socket/socket");

require("dotenv").config();

db.connect().catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(morgan("combined"));

route(app);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Port " + PORT + " is running"));

io.on("connection", onConnected);
let socketConected = new Set();

async function onConnected(socket) {
    console.log("Socket: " + socket.id);
    const {userID} = socket.handshake.query;

    console.log("UserID: " + userID);

    if (userID != null && Boolean(userID)) {
        console.log("marker");
        try {
            await User.findByIdAndUpdate(userID, {
                socket_id: socket.id,
                status: "Online",
            }, { new: true }); 
        } catch (e) {
            console.log(e);
        }
    }
    





    socketConected.add(socket.id);

    io.emit('total-connected', socketConected.size);

    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
        socketConected.delete(socket.id);
        io.emit('total-connected', socketConected.size);
    });
}

// io.on('connection', (socket) => {
//     console.log(socket.id)
//     })
