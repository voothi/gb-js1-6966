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


document.querySelector(".btn-right").addEventListener("click", function (event) {
    document
        .querySelector(".slider")
        .querySelectorAll("img")[indexCurrent]
        .classList.add("hidden");
    indexCurrent++;
    if (indexCurrent > imgData.length - 1) {
        indexCurrent = 0;
    }
    document
        .querySelector(".slider")
        .querySelectorAll("img")[indexCurrent]
        .classList.remove("hidden");
});