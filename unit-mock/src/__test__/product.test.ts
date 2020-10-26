import * as productModel from "../product";
import { importTestData } from "./helper";

const testData = importTestData("/testData") as {
  [fn: string]: productModel.Product;
};

// fetchProducts() でDBからデータをとるのではなく、testDataから返却するように差し替え
jest
  .spyOn(productModel, "fetchProducts")
  .mockImplementation(async (ids: string[]) => {
    return ids.map((id) => testData[id]);
  });

describe("firestore", () => {
  test.each([
    [["iphone", "ipad"], 199600],
    [["iphone"], 79800],
    [["iphone", "invalid"], 79800],
    [["invalid"], 0],
  ])(
    "calculatePrices(): sum %o prices to equal %p",
    async (productIds, expected) => {
      expect.assertions(1);
      const actual = await productModel.calculatePrices(productIds);
      expect(actual).toBe(expected);
    }
  );
});
