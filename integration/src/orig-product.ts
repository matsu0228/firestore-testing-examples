#!/usr/bin/env node

import * as admin from "firebase-admin";
const app = admin.initializeApp();
const db = app.firestore();

type Product = {
  id: string;
  name: string;
  price: number;
};

const calculatePrices = async (productIds: string[]): Promise<number> => {
  let total = 0;
  await Promise.all(
    productIds.map(async (productId) => {
      await db
        .collection(`products`)
        .doc(productId)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("not found product: ", productId);
            return;
          }
          const product = doc.data() as Product;
          if (!product.price) {
            console.log("invalid price: ", productId, product);
            return;
          }
          total += product.price;
        });
    })
  );
  return total;
};

const main = async () => {
  const total = await calculatePrices(["iphone", "ipad"]);
  console.log("total: ", total);
};
main();
