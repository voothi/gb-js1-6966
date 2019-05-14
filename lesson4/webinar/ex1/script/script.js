"use strict";

// Объектный литерал
const obj1 = {
    author: "Admin",
    text: "lorem ipsum",
    show: function () {
        alert(this.author + " say: " + this.text);
    }
};

console.log(obj1.author);
console.log(obj1.text);
obj1.show();

let obj2 = {
    author: "User",
    text: "Hello",
    // ES6 Notation
    show() {
        alert(this.author + " say: " + this.text);
    }
};

console.log(obj2.author);
console.log(obj2.text);
obj2.show();