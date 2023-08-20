const Main = {
    loading: 0,
    started: 0,
    functions: [],
    init: function () {
        if (this.loading > 0) return;
        if (this.started < this.functions.length) {
            this.functions[this.started]();
            this.started++;
        }
    },
    queue: function (func) {
        this.functions.push(func);
    }
}
Main.queue(() => Accounts.force_sign_in("Haahiq1234", 1234));
Main.queue(() => setTimeout(() => contacts.select_contact("Haahiq2020"), 200));

document.body.onload = function () {
    contacts.init();
    sign_in.init();
    sign_up.init();
    texter.init();
    menu.init();
    header.init();
    background.init();

    document.getElementById("background").style.display = "none";

    Main.init();
};
