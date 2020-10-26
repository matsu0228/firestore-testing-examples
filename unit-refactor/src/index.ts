#!/usr/bin/env node

import { calculatePrices } from "./product";

const main = async () => {
  const total = await calculatePrices(["iphone", "ipad"]);
  console.log("金額合計: ", total);
};
main();
