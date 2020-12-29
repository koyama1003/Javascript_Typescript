"use strict";
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "sojiro",
//   age: 24,
//   hobbies: ["sports", "cooking"],
//   role: [2, "auther"],
// };
// console.log(person.name);
// for (const hobby of person.hobbies) {
//   console.log(hobby.toUpperCase());
// }
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 100] = "ADMIN";
    Role[Role["READONLI"] = 101] = "READONLI";
    Role[Role["AUTHER"] = 102] = "AUTHER";
})(Role || (Role = {}));
var person = {
    name: "sojiro",
    age: 24,
    hobbies: ["sports", "cooking"],
    role: Role.ADMIN,
};
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
if (person.role === Role.ADMIN) {
    console.log(Role.ADMIN);
}
