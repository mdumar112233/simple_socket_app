const express = require('express');
const app = express();
const http = require('http');
const createSerer = http.createServer(app);

const {Server} = require('socket.io');
let io = new Server(createSerer);

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")
})

io.on('connection', (socket) => {
    console.log('user connect');

    // RECEIVE DATA FROM CLIENT
    socket.on('chat', (data) => {
        console.log(data);
        // DATA RETURN TO CLIENT
        io.emit('chat_transfer', data)
    })
})

createSerer.listen(3000)