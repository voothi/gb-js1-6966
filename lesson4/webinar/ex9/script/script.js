"use strict";

function User (name) { 
    this.name = name;
}

User.nameMaxLength = 20;
User.isNameLengthCorrect = function () {
    if (name.length <= User.nameMaxLength) {
        console.log("Correct");
    } else {
        console.log("Incorrect");
    }
};

const user1 = new User("Denis");
User.isNameLengthCorrect(user1.name);