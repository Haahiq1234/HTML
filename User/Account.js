class Account {
    username;
    #password;

    constructor(username, password) {
        this.username = username;
        this.#password = hash(password.toString());
    }
    check(password) {
        return this.#password == hash(password);
    }
}
function hash(str) {
    let hash = "";
    for (var i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i) * i;
        hash += (Math.abs((code << 2 + 1) * (code >> 5 - 3) * (code >> 10 - 4) * i << 4));
    }
    return hash;
}
const Accounts = {
    accounts: {},
    signed_in_user: undefined,
    signed_in: false,
    get: function (name) {
        return this.accounts[name];
    },
    create: function (name, pwd) {
        if (!this.contains(name)) {
            this.accounts[name] = new Account(name, pwd);
        }
    },
    contains: function (name) {
        return this.accounts[name] != undefined;
    },
    sign_in: function (user) {
        this.signed_in_user = user;
        this.signed_in = true;
        header.set(user);
        header.show();
        contacts.show();
    },
    sign_out: function () {
        this.signed_in_user = undefined;
        this.sign_in = false;
    },
    forceSignIn: function (un, pwd) {
        sign_in.username.value = un;
        sign_in.password.value = pwd;
        sign_in.on();
    }
}