console.log("Here we are learning about modules");

import { sum, sub, mul, div } from "./utils/utils.js";

console.log("Adding two numbers =", sum(10, 20));
console.log("Subtracting two numbers =", sub(20, 10));
console.log("Multiplying two numbers =", mul(10, 20));
console.log("Dividing two numbers =", div(100, 20));
