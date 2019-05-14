"use strict";

function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

Person.prototype.incrementalAge = function () {
    this.age += 1;
}

function Personal (name, age, gender, location, hobby) {
    Person.call(this, name, age, gender);
    this.location = location;
    this.hobby = hobby;
}

Personal.prototype = Object.create(Person.prototype);
Personal.prototype.constructor = Personal;

Personal.prototype.sayName = function () {
    console.log("My name is " + this.name);
}

const personal1 = new Personal ("Denis", 31, "male", "Moscow", "Fitness");
personal1.incrementalAge();
console.log(personal1.age);
personal1.sayName();