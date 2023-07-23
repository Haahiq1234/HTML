const sign_in = {
    screen: document.getElementById("signinscreen"),
    username: document.getElementById("signinusername"),
    password: document.getElementById("signinpassword"),
    signin_button: document.getElementById("signinbutton"),
    signup_button: document.getElementById("si_signupbutton"),
    on: function (ths) {
        let username = this.username.value;
        let password = this.password.value;
        if (username.length == 0) {
            return;
        }
        if (password.length == 0) {
            this.error("Please enter password");
        }
        let user = Accounts.get(username);
        if (!user) {
            this.error("Username does not exist");
            return;
        }
        if (!user.check(password)) {
            this.error("Password is incorrect");
            return;
        }
        this.hide();
        Accounts.sign_in(user);
        this.password.value = "";
        this.password.blur();
        this.username.value = "";
        this.username.blur();
    },
    error: function (message) {
        console.log(message);
    },
    init: function () {
        let ths = this;
        this.signin_button.onclick = function () {
            sign_in.on(ths);
        }
        this.signup_button.onclick = function () {
            sign_in.hide();
            sign_up.show();
        }

        this.username.onkeydown = function (event) {
            if (event.key == "Enter") {
                sign_in.on(ths);
            }
        };
        this.password.onkeydown = function (event) {
            if (event.key == "Enter") {
                sign_in.on(ths);
            }
        };
        // /this.hide();
    },
    enable: function () {

    },
    hide: function () {
        this.screen.style.display = "none";
    },
    show: function () {
        sign_up.hide();
        this.screen.style.display = "";
    },
};