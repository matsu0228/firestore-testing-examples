import { app } from "firebase-admin";

type Product = {
  id: string;
  name: string;
  price: number;
};

export class Firestore {
  constructor(private app: app.App | any) {
    this.app = app;
  }

  async calculatePrices(productIds: string[]): Promise<number> {
    let total = 0;
    await Promise.all(
      productIds.map(async (productId) => {
        await this.app
          .firestore()
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
  }
}
