"use strict";

class User {
    url = null;

    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    set vkUrl(url) {
        if (/^https?.*/gm.test(url)) {
            this.url = url;
        } else {
            throw new Error("Passed invalid URL value: " + url);
        }
    }
}

const user1 = new User("Denis", "Novikov");
user1.vkUrl = 'https://vk.com/test';
console.log(user1.vkUrl);
