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
        Accounts.get(username, password).then(function (data) {
            if (!data.exists) {
                sign_in.error("Username does not exist");
                return;
            }
            if (!data.success) {
                sign_in.error("Password is incorrect");
                return;
            }
            Accounts.sign_in(data.acc);
            sign_in.hide();
            sign_in.password.value = "";
            sign_in.password.blur();
            sign_in.username.value = "";
            sign_in.username.blur();

        });
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