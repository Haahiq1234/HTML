const background = {
    main_container: document.getElementById("main_container"),
    main_container: document.getElementById("main_container"),
    hide_main_container() {
        this.main_container.style.display = "none";
    },
    show_main_container() {
        this.main_container.style.display = "";
    },
    init: function () {
        this.hide_main_container();
    },

}