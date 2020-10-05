#!/usr/bin/env node

import { Firestore } from "./firestore";
import { app } from "./firebase-admin";
const db = new Firestore(app);

const main = async () => {
  const total = await db.calculatePrices(["iphone", "ipad"]);
  console.log("金額合計: ", total);
};
main();
