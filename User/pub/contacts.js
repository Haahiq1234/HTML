const contacts = {
    container: document.getElementById("contacts_container"),
    contacts_list_div: document.getElementById("contacts_list"),
    contacts: {},
    hide: function () {
        hide(this.container);
    },
    show: function () {
        show(this.container);
    },
    init: function () {
        this.hide();
        this.contacts_list_div.innerHTML = "";
        Fetch("/account_list").then(function (arr) {
            for (var name of arr) {
                contacts.add_contact(name);
            }
        });
    },
    add_contact: function (name) {
        let a = document.createElement("a");
        let li = document.createElement("li");
        li.appendChild(a);
        a.innerText = name;
        a.onclick = function () {
            contacts.select_contact(name);
        }
        this.contacts_list_div.appendChild(li);
        this.contacts[name] = li;
    },
    select_contact: function (name) {
        console.log(name);
        this.hide();
        texter.select_contact(name);
        texter.show();
    },
    sign_in(acc) {
        hide(this.contacts[acc.username]);
    },
    sign_out(acc) {
        show(this.contacts[acc.username]);
    }
};
function hide(elem) {
    elem.style.display = "none";
}
function show(elem) {
    elem.style.display = "";
}