"use strict";

class User {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    get fullName() {
        return this.name + " " + this.surname;
    }
}

const user1 = new User("Denis", "Novikov");
console.log(user1.name);
console.log(user1.surname);
console.log(user1.fullName);

