const texter = {
    elem: document.getElementById("texter_screen"),
    heading: document.getElementById("texter_heading"),
    init: function () {
        this.hide();
    },
    hide: function () {
        hide(this.elem);
        hide(this.heading);
    },
    show: function () {
        show(this.elem);
        show(this.heading);
    },
    select_contact: function (name) {
        this.heading.innerText = name.toUpperCase();
    }
};