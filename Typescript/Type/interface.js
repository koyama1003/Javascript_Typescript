"use strict";
var user1;
user1 = {
    name: "Max",
    age: 30,
    greet: function (phrase) {
        console.log(phrase + "am " + this.name);
    },
};
user1.greet("Hello");
