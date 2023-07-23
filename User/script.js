

document.body.onload = (function () {
    Accounts.create("Haahiq1234", 1234);
    Accounts.create("Haahiq2020", 1234);
    Accounts.create("Hamzahsan", 2020);
    sign_in.init();
    sign_up.init();
    texter.init();
    contacts.init();
    menu.init();
    header.init();

    Accounts.forceSignIn("Haahiq1234", 1234);
});
