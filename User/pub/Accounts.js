const Accounts = {
    signed_in_user: undefined,
    signed_in: false,
    get: function (name, password) {
        return FetchP("/get_account", { name, password: encodeURI(password) });
    },
    create: async function (username, password) {
        let acc = { username, password: password };

        return FetchP("/create_account", acc);
    },
    contains: function (name) {
        return FetchP("/account_exists", { name });
    },
    sign_in: function (user) {
        this.signed_in_user = user;
        this.signed_in = true;
        header.set(user);
        contacts.sign_in(user);
        header.show();
        contacts.show();
        background.show_main_container();
    },
    sign_out: function () {
        contacts.sign_out(this.signed_in_user);
        this.signed_in_user = undefined;
        this.signed_in = false;
    },
    force_sign_in: function (un, pwd) {
        sign_in.username.value = un;
        sign_in.password.value = pwd;
        sign_in.on();
    }
}
async function Fetch(url) {
    Main.loading++;
    const response = await fetch(url);
    //console.log(response);
    const json = await response.json();
    Main.loading--;
    Main.init();
    return json;
}
async function FetchP(url, d) {
    Main.loading++;
    const response = await fetch(url, {
        body: JSON.stringify(d),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    });
    //console.log(response);
    const data = await response.json();
    Main.loading--;
    Main.init();
    return data;
}
// Fetch("/account_list").then(function (data) {
//     console.log(data);
// });