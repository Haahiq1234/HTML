const MIN_USERNAME_CHARACTER_LIMIT = 8;
const MAX_USERNAME_CHARACTER_LIMIT = 16;

const MIN_PASSWORD_CHARACTER_LIMIT = 4;
const MAX_PASSWORD_CHARACTER_LIMIT = 16;

const sign_up = {
    screen: document.getElementById("signupscreen"),
    username: document.getElementById("signupusername"),
    password: document.getElementById("signuppassword"),
    register_button: document.getElementById("signupbutton"),
    back_button: document.getElementById("signupbackbutton"),
    on: function () {
        let username = this.username.value;
        let password = this.password.value;
        // /console.log(username, password);
        if (username.length < MIN_USERNAME_CHARACTER_LIMIT || username.length > MAX_USERNAME_CHARACTER_LIMIT) {
            sign_up.error(`Username must be between ${MIN_USERNAME_CHARACTER_LIMIT} and ${MAX_USERNAME_CHARACTER_LIMIT} characters.`);
            return;
        }
        if (password.length < MIN_PASSWORD_CHARACTER_LIMIT || password.length > MAX_PASSWORD_CHARACTER_LIMIT) {
            sign_up.error(`Password must be between ${MIN_PASSWORD_CHARACTER_LIMIT} and ${MAX_PASSWORD_CHARACTER_LIMIT} characters.`);
            return;
        }
        this.hide();
        Accounts.create(username, password).then(function (data) {
            if (!data.exists) {
                Accounts.sign_in(data.account);
            } else {
                sign_up.error("Username already exists.");
            }

        });
    },
    error: function (message) {
        console.log(message);
    },
    hide: function () {
        this.screen.style.display = "none";
    },
    show: function () {
        this.screen.style.display = "";
    },
    init: function () {
        let ths = this;
        this.register_button.onclick = function () {
            sign_up.on();
        }
        this.back_button.onclick = function () {
            sign_up.hide();
            sign_in.show();
        };
        this.username.onkeydown = function (event) {
            if (event.key == "Enter") {
                sign_up.on(ths);
            }
        };
        this.password.onkeydown = function (event) {
            if (event.key == "Enter") {
                sign_in.up(ths);
            }
        };
        this.hide();
    }
};