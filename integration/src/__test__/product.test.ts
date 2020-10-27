import { ProductModel } from "../product";
import * as helper from "./helper";
import * as firebase from "@firebase/rules-unit-testing";

describe("products", () => {
  const projectId = helper.makeProjectID("products");
  const testDB = firebase.initializeAdminApp({ projectId }).firestore();
  const product = new ProductModel(testDB);

  beforeAll(async () => {
    await helper.importToEmulator(
      "./src/__test__/testData/products/",
      "products",
      projectId
    );
  });

  afterAll(async () => {
    await firebase.clearFirestoreData({
      projectId,
    });
    await Promise.all(firebase.apps().map((app) => app.delete()));
    console.log("cleanup test data: ", projectId);
  });

  test.each([
    [["iphone", "ipad"], 199600],
    [["iphone"], 79800],
    [["iphone", "invalid"], 79800],
    [["invalid"], 0],
  ])(
    "calculatePrices(): sum %o prices to equal %p",
    async (productIds, expected) => {
      expect.assertions(1);
      const actual = await product.calculatePrices(productIds);
      expect(actual).toBe(expected);
    }
  );
});
