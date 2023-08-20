class Account {
    username;
    password;
    messages = {};

    constructor(username, password) {
        this.username = username;
        this.password = hash(password.toString());
    }
    check(password) {
        return this.password == hash(password);
    }
}
function hash(str) {
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