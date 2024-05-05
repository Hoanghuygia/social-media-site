const mongoose = require('mongoose');

// async function connect(){
//     try {
//         await mongoose.connect('mongodb://localhost:27017/f8-dev');
//     console.log("Connect succesfully");
        
//     } catch (error) {
//         console.log(error);
//     }
// }

async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect to MongoDB cloud successfully")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

module.exports = {
    connect
}