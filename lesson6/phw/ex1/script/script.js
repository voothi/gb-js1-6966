"use strict"

let slider = document.querySelector(".slider");

let imgstr = "";
for (let key in imgData) {
    let a = document.createElement("img");
    a.setAttribute("src", "http://ya.ru/1.img");
    console.dir(a.src);
    console.log(a.src);
    console.log(typeof (a));
    imgstr += document.createElement("img") + imgData[key].url;
}