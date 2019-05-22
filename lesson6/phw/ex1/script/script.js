"use strict"
let indexMax = imgData.length - 1;
let indexCurrent = 0;

for (var i = 0; i < imgData.length; i++) {
    let insertImg = document.createElement("img");
    insertImg.setAttribute("src", imgData[i].url);
    insertImg.classList.add("hidden");
    document.querySelector(".slider").appendChild(insertImg);
}

window.addEventListener("load", function (event) {
    document
        .querySelector(".slider")
        .querySelectorAll("img")[indexCurrent]
        .classList.remove("hidden");
});


let buttonRight = document.querySelector(".btn-right");
buttonRight.addEventListener("click", function (event) {

});