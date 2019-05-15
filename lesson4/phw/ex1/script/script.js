"use strict";

function numToObj(num) {
if (!Number.isInteger(num) || num <= 0 || num >= 999) {
    console.log("Введите целое число из [0, 999]");
    return {};
}

const obj = Object.create(null);
obj.firstDigit = Math.floor(num / 100); 
obj.secondDigit = Math.floor(num / 10) % 10;
obj.thirdDigit = num % 10;

return obj;
}

console.log(numToObj(123));


// Не работает добивка нулями
// let num = +prompt("Введите целое число из [0, 999]: ");
// if (Number.isInteger(num) && num >= 0 && num <= 999) {
//     let num1 = new numToObj(num);
//     console.log(num1);
// } else {
//     alert("Попробуйте еще...");
// }

// function numToObj(num) {
//     let arr = num.toString().split("");
//     let obj = { ...arr };
//     this.firstDigit = obj[0];
//     this.secondDigit = obj[1];
//     this.thirdDigit = obj[2];
// }

