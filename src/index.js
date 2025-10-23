const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

const usersRouter = require('./routes/users');

app.use(express.json());

app.use(express.static('public'));

app.use('/users', usersRouter);

const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

module.exports = { app, server, io };
