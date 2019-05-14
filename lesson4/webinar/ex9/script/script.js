"use strict";

class User {
    constructor() {
        this.name = name;
    }

    static nameMaxLength = 20;

    static isNameLengthCorrect(name) {
        if (name.length <= this.nameMaxLength) {
            console.log("Correct");
        } else {
            console.log("Incorrect");
        }
    }
}


const user1 = new User("Denis");
User.isNameLengthCorrect(user1.name);