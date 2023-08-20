const http = require('http');
const express = require('express');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

const mysql2 = require('mysql2');

var con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "{enter_pwd_pls}"
});

con.connect(function (err) {
    if (err) {
        console.log("Shit there is error.");
        throw err;
    }
    console.log("Connected!");
});

app.get("/req/*", function (req, res) {
    res.setHeader("status", 200);
    console.log(req.url.replace("req/", ""));
    res.end("Yes yes I got your query.");
});
app.get("/", function (req, res) {
    res.setHeader("status", 200);
    let txt = fs.readFileSync('index.html');
    res.end(txt);
})
app.get("*.js", function (req, res) {
    res.setHeader("status", 200);
    res.end(fs.readFileSync(req.url.replace("/", "")));
});
server.listen(3000, function () {
    console.log("listening on port 3000");
});
