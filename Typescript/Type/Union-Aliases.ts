type Combinable = number | string;
const combine = (input1: Combinable, input2: Combinable) => {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};
const Ages = combine(30, 26);
console.log(Ages);

const Names = combine("john", "maxim");
console.log(Names);
