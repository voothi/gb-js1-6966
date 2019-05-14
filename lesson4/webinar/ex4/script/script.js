"use strict";

const PostParent = {
    role: "user",
    userName: null,
    showRole: function () {
        console.log(this.role);
    }
};

let Post1 = Object.create(PostParent);
Post1.userName = "Denis";
