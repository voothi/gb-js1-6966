"use strict";

const numInput = 123;
let arr = numInput.toString().split("");
// console.log(arr[0]);
let obj = { ...arr };
// let keys = Object.keys(obj);

// let map = {
//     0: "firstDigit",
//     1: "secondDigit",
//     2: "thirdDigit"
// };

const map = ["firstDigit", "secondDigit", "thirdDigit"];

// let obj = {};
// obj.test = 1;

arr.forEach(function (index) {
    return index = map[index];
});

// obj.forEach(function (currentValue) {
//     return index.price - index.price * 0.5;
// }

// +prompt();

// function Digit(numInput) {

    // arr[1];
    // arr[2];

    // 

    // return obj;
// }

// obj.forEach

// Digit(123);