async function onConnected(socket){
    console.log("Socket: " + socket.id);
    // const {userID} = socket.handshake.query;
    // console.log("UserID: " + userID);
    // console.log("Socket handshake: " + JSON.stringify(socket.handshake))
}

module.exports = {onConnected};