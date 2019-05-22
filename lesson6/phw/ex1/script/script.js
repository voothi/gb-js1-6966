"use strict"
let indexMax = imgData.length - 1;
let indexCurrent = 0;

for (var i = 0; i < imgData.length; i++) {
    // создать элемент img
    let insertImg = document.createElement("img");
    insertImg.setAttribute("src", imgData[i].url);
    insertImg.classList.add("hidden");
    // добавить в слайдер
    document.querySelector(".slider").appendChild(insertImg);
}

button = document.querySelector(".btn-right");
button.addEventListener("click", function (event) {
    insertImg.classList.add("hidden");
});
