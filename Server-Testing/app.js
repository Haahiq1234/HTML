const fs = require('fs');
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get("/", function(req, res) {
    res.setHeader('status', 200);
    res.end(fs.readFileSync('index.html'));
});

app.get("*", function(req, res) {
    res.setHeader('status', 200);
    let path = req.url.replace('/', "");
    res.end(fs.readFileSync(path));
});

io.on('connection', function(socket) {
    console.log("A user has connected.");
    socket.on('disconnect', function() {
        console.log("User disconnected.");
    });

    socket.on('upvote', function(val) {
        console.log(val);
    });
});

io.on('upvote', function(val) {
    console.log(val, "Hello");
});

server.listen(3000, function() {
    console.log("Listening on port 3000");
});
