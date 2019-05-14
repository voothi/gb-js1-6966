"use strict";

class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    incrementAge() {
        this.age += 1;
    }
}

const person1 = new Person("Denis", 31, "male");
// console.log(person1);
// person1.incrementAge();
// console.log(person1);


class Personal extends Person {
    constructor(name, age, gender, location, hobby) {
        super(name, age, gender);
        this.location = location;
        this.hobby = hobby;
    }

    sayName = function () {
        console.log("My name is " + this.name);
    }
}

const personal1 = new Personal("Denis", 31, "male", "Moscow", "Fitness");
console.log(personal1);
personal1.incrementAge();
console.log(personal1);