#!/usr/bin/env node

import { sum } from "./sum";
import { TaxCalculator, TaxOperator } from "./tax-calculator";

const main = () => {
  const result = sum(1, 2);
  console.log("数値合計: ", result);
  const resultString = sum(1, "2");
  console.log("文字列合計: ", resultString);

  const calculator = new TaxCalculator("floor");
  const tax = calculator.calculateTax(110);
  console.log("消費税計算: ", tax);
};
main();
