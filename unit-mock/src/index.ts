#!/usr/bin/env node

import * as db from "./firestore";

const main = async () => {
  const total = await db.calculatePrices(["iphone", "ipad"]);
  console.log("金額合計: ", total);
};
main();
