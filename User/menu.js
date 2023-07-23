const menu = {
    opener: document.getElementById("header_menu_opener"),
    container: document.getElementById("menu_container"),
    sign_out: document.getElementById("menu_sign_out"),
    name: document.getElementById("menu_first_option"),
    opened: false,
    init: function () {
        let opener_padding = 10;
        let size = header.height - opener_padding + "px";
        this.opener.style.width = size;
        this.opener.style.height = size;
        this.opener.style.top = opener_padding / 2 + "px";
        this.opener.style.right = opener_padding / 2 + "px";
        this.hide();

        this.opener.onclick = function () {
            if (menu.opened) {
                menu.hide();
            } else {
                menu.show();
            }
        }
        this.sign_out.onclick = function () {
            menu.hide();
            header.hide();
            texter.hide();
            contacts.hide();
            sign_in.show();
        }
    },
    hide() {
        this.opened = false;
        this.container.style.display = "none";
    },
    show() {
        this.opened = true;
        this.container.style.display = "";
    }
};