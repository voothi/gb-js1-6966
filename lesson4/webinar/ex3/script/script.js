"use strict";

function UserRole () {
    this.rights = ['create', 'edit'];
}

UserRole.prototype.hello = "hello";

const userRole1 = new UserRole();

console.log(userRole1.__proto__ === UserRole.prototype);