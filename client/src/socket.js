import io from 'socket.io-client';

let socket;

const connectSocket = (userID) => {
    if (!socket) {
        socket = io("http://localhost:3000", {
            query: `userID=${userID}`
        });

        socket.on('connect', () => {
            console.log(`Connected with ID: ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    }
};

export { socket, connectSocket };
