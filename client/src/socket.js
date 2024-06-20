import io from 'socket.io-client';

let socket;

const connectSocket = (userID) => {
    if (!socket) {
        //http://localhost:3000/
        socket = io("https://sugar-cube.onrender.com/", {
            query: `userID=${userID}`,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 10,
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    }
};

export { socket, connectSocket };
