import * as admin from "firebase-admin";
const app = admin.initializeApp();
const db = app.firestore();

export type Product = {
  id: string;
  name: string;
  price: number;
};

const fetchProducts = async (productIds: string[]): Promise<Product[]> => {
  const products: Product[] = [];
  await Promise.all(
    productIds.map(async (productId) => {
      const product = await db
        .collection(`products`)
        .doc(productId)
        .get()
        .then((doc) => ({ ...doc.data(), id: doc.id } as Product));
      products.push(product);
    })
  );
  return products;
};

export const calculatePrices = async (
  productIds: string[]
): Promise<number> => {
  let total = 0;
  const products = await fetchProducts(productIds);
  products.forEach((product) => {
    total += product.price;
  });
  return total;
};
