const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');
const db = require('./config/db');
const helmet = require('helmet');
const http = require('http');
const {Server} = require('socket.io');
const User = require('./app/models/user');

require('dotenv').config();

db.connect().catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use(morgan('combined'));

route(app);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        method: ['GET', 'POST']
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Port ' + PORT + ' is running'));

io.on("connection", async (socket) =>{
    console.log("Socket: " + socket);
})
