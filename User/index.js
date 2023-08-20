const express = require('express');
const fs = require("fs");
const app = express();

const accounts = readjson("users.json");
const account_list = [];
for (let username in accounts) {
    account_list.push(username);
}
const KEY_LENGTH = 20;
function RandomKey() {
    let key = "";
    for (var i = 0; i < KEY_LENGTH; i++) {
        key += String.fromCharCode(65 + Math.floor(Math.random() * 58));
    }
    return key;
}
app.listen(3000, function () {
    console.log("Server listening on port 3000");
});

app.use(express.static("pub"));
app.use(express.json({ limit: "1mb" }));


app.get("/account_list", function (req, res) {
    console.log(account_list);
    res.json(account_list);
});
app.post("/create_account", function (req, res) {
    let acc = req.body;
    acc.key = RandomKey();
    let exists = addAccount(acc);
    res.json({ exists, account: !exists ? acc : undefined });
});
app.post("/get_account", function (req, res) {
    let d = req.body;
    let acc = accounts[d.name];
    if (!acc) {
        res.json({ exists: false, success: false });
        return;
    }
    if (acc.password == hash(decodeURI(d.password))) {
        acc.key = RandomKey();
        res.json({ exists: true, success: true, acc });
    } else {
        res.json({ exists: true, success: false });
    }
});
app.post("/account_exists", function (req, res) {
    let d = req.body;
    let acc = accounts[d.name];
    res.json({ exists: acc != undefined });
});
app.post("/message", function (req, res) {
    let data = req.body;
    let userTo = accounts[data.to];
    let userFrom = accounts[data.from];

    if (!userTo.messages) {
        userTo.messages = {};
    }
    if (!userFrom.messages) {
        userFrom.messages = {};
    }
    if (!userTo.messages[data.from]) {
        userTo.messages[data.from] = [];
    }
    if (!userFrom.messages[data.to]) {
        userFrom.messages[data.to] = [];
    }
    let dat = { content: data.content, sender: data.from };
    userTo.messages[data.from].push(dat);
    userFrom.messages[data.to].push(dat);

    //console.log(userTo, userFrom);

    res.json({ success: true, userFrom });
    update();
});
app.post("/update", function (req, res) {
    let acc = req.body;
    if (acc.key === accounts[acc.username].key) {
        accounts[acc.username] = acc;
        update();
    }
});
addAccount({ username: "Haahiq1234", password: 1234 });
addAccount({ username: "Haahiq2020", password: 4321 });
function addAccount(acc) {
    if (accounts[acc.username] == undefined) {
        acc.password = hash(acc.password);
        accounts[acc.username] = acc;
        account_list.push(acc.username);
        writeAsJson("users.json", accounts);
        return false;
    }
    return true;
}
function update() {
    writeAsJson("users.json", accounts);
}
function writeAsJson(filename, text) {
    fs.writeFileSync(filename, JSON.stringify(text, null, 4));
}
function readjson(filename) {
    return JSON.parse(fs.readFileSync(filename))
}
function hash(str) {
    str = str.toString();
    let hashed = "";
    let hashCodes = str.split("").map((v, i) => v.charCodeAt(0) * (i + 50));
    for (var i = 0; i < hashCodes.length; i++) {
        let code = 0;
        for (var j = 0; j < hashCodes.length; j++) {
            let hashCode = hashCodes[j];
            code += (Math.abs((hashCode << 2 + 1) * (hashCode >> 5 - 3) * (hashCode * (j - i) >> 10 - 4) * (i + 5) << 4));
        }
        hashed += code;
    }
    return hashed.split("").map((x) => String.fromCharCode(parseInt(x) + 65)).join("");
}