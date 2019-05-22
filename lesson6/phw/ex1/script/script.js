"use strict"
let indexMax = imgData.length - 1;
let indexCurrent = 0;

/**
 * @description Получает классы элемента
 * @returns {DOMTokenList} Возвращает токены, массивообразный объект, элементы которого - строки
 */
function getSliderClassListCurrentElement() {
    return document
        .querySelector(".slider")
        .querySelectorAll("img")[indexCurrent].classList;
}


for (var i = 0; i < imgData.length; i++) {
    let insertImg = document.createElement("img");
    insertImg.setAttribute("src", imgData[i].url);
    insertImg.classList.add("hidden");
    document.querySelector(".slider").appendChild(insertImg);
}

window.addEventListener("load", function (event) {
    getSliderClassListCurrentElement().remove("hidden");
});


document.querySelector(".btn-right").addEventListener("click", function () {
    getSliderClassListCurrentElement().add("hidden");
    indexCurrent++;
    if (indexCurrent > indexMax) {
        indexCurrent = 0;
    }
    getSliderClassListCurrentElement().remove("hidden");
});

document.querySelector(".btn-left").addEventListener("click", function () {
    getSliderClassListCurrentElement().add("hidden");
    indexCurrent--;
    if (indexCurrent < 0) {
        indexCurrent = indexMax;
    }
    getSliderClassListCurrentElement().remove("hidden");

});