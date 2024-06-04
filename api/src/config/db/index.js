const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log("Connect to MongoDB cloud successfully");
    } catch (error) {
        console.log("Connect failed " + error.message);
    }
}

module.exports = {
    connect,
};
