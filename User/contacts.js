const contacts = {
    elem: document.getElementById("contacts_container"),
    hide: function () {
        this.elem.style.display = "none";
    },
    show: function () {
        this.elem.style.display = "";
    },
    init: function () {
        this.hide();
    },
};