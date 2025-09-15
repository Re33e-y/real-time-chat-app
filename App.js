// A simple Node.js server with Socket.IO
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'sendMessage' events from the client
  socket.on('sendMessage', (message) => {
    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
