const header = {
    elem: document.getElementById("header_container"),
    text: document.getElementById("header_text"),
    width: 0,
    height: 0,
    hide: function () {
        this.elem.style.display = "none";
    },
    show: function () {
        this.elem.style.display = "";
    },
    init: function () {
        this.hide();
    },
    set: function (user) {
        menu.name.innerHTML = user.username.toUpperCase();
    }
};
//header.show();
header.height = header.elem.clientHeight;
//header.hide();