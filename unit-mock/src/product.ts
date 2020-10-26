import * as admin from "firebase-admin";

const app = admin.initializeApp();
const db = app.firestore();

export type Product = {
  id: string;
  name: string;
  price: number;
};

export const fetchProducts = async (
  productIds: string[]
): Promise<Product[]> => {
  const products: Product[] = [];
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
          products.push(product);
        });
    })
  );
  return products;
};

export const sumProductPrices = (products: Product[]): number => {
  let total = 0;
  products.forEach((p) => {
    if (p.price) {
      total += p.price;
    }
  });
  return total;
};

export const calculatePrices = async (
  productIds: string[]
): Promise<number> => {
  const products = await fetchProducts(productIds);

  console.log("fetched :", products);
  return sumProductPrices(products);
};
