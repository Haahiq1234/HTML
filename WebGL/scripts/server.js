const http = require('http');
const express = require('express');
const fs = require('fs');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);

app.get("/", function(req, res) {
    res.setHeader("status", 200);
    let txt = fs.readFileSync('index.html');
    res.end(txt);
})

app.get("/res/*", function(req, res) {
    res.setHeader("status", 200);
    res.end(fs.readFileSync(req.url.replace("/", "")));
})
app.get("*.js", function(req, res) {
    res.setHeader("status", 200);
    res.end(fs.readFileSync("scripts" + req.url));
});
app.get("/style.css", function(req, res) {
    res.setHeader("status", 200);
    res.end(fs.readFileSync("style.css"));
});

server.listen(3000, function() {
    console.log("listening on port 3000");
});
