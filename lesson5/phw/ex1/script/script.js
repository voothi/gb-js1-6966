"use strict"

let modal = document.querySelector(".modal");
let button_show_modal = document.querySelector(".button_show_modal");
let button_close = document.querySelector(".button_close");


button_show_modal.addEventListener("click", function () {
    modal.style.display = "block";
    modal.classList.add("magictime", "puffIn");
});

button_close.addEventListener("click", function () {
    modal.classList.remove("magictime", "puffIn");
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});