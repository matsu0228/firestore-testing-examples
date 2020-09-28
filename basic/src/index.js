#!/usr/bin/env node

const sum = require("./sum");
const append = require("./append");
const calculate_tax = require("./calculate_tax");

const main = () => {
  const result = sum(1, 2);
  console.log("数値合計: ", result);

  const array = append(["1", 2], 3);
  console.log("配列追加: ", array);

  const tax = calculate_tax(110, 10);
  console.log("消費税計算: ", tax);
};
main();
