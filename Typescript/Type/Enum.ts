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
enum Role {
  ADMIN = 100,
  READONLI,
  AUTHER,
}
const person = {
  name: "sojiro",
  age: 24,
  hobbies: ["sports", "cooking"],
  role: Role.ADMIN,
};
console.log(person.name);
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
if (person.role === Role.ADMIN) {
  console.log(Role.ADMIN);
}
