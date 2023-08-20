let drag = document.getElementById("dragObj");
drag.ondragstart = function (e) {
    ox = e.clientX - x;
    oy = e.clientY - y;
    e.dataTransfer.setDragImage(drag, 11111110, 10);
    e.dataTransfer.dropEffect = "move";
    console.log(e, e.dataTransfer);
    //e.preventDefault();
}
drag.ondrag = function (e) {
    e.preventDefault();
    reset(e.clientX, e.clientY);
}
drag.ondragend = function (event) {
    event.preventDefault();
    console.log(event);
    reset(event.clientX, event.clientY);
}
let x = 0;
let y = 0;
let ox = 0;
let oy = 0;
function reset(_x, _y) {
    x = _x - ox;
    y = _y - oy;
    drag.style.top = y + "px";
    drag.style.left = x + "px";
}