const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Menggunakan middleware CORS
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running.');
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', ({ username, message }) => {
        const msg = { username, message };
        io.emit('message', msg); // Emit message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
