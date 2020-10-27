#!/usr/bin/env node

import admin from "firebase-admin";
import { ProductModel } from "./product";

const main = async () => {
  const app = admin.initializeApp();
  const db = app.firestore();

  const product = new ProductModel(db);
  const total = await product.calculatePrices(["iphone", "ipad"]);
  console.log("金額合計: ", total);
};
main();
