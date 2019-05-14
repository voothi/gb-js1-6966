"use strict";

// Функция конструктор
function Post(author, text) {
    this.author = author;
    this.text = text;
    this.show = function() {
        alert(this.author + " say: " + this.text);
    }
}

const post1 = new Post("Admin", "lorem");

console.log(typeof post1);

// console.log(post1);
console.log(post1.author);
console.log(post1.text);
post1.show();

const post2 = new Post("User", "Hello");
console.log(post2.author);
console.log(post2.text);
post2.show();