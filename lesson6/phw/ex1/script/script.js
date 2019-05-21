"use strict"

for (let key in imgData) {
    let insertImg = document.createElement("img");
    insertImg.setAttribute("src", imgData[key].url);
    insertImg.setAttribute("alt", "");
    document.querySelector(".slider").appendChild(insertImg);
}