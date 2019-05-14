"use strict";

function UserRole () {
    this.rights = ['create', 'edit'];
}

const userRole1 = new UserRole();
debugger;

console.log(userRole1.__proto__ === UserRole.prototype);
