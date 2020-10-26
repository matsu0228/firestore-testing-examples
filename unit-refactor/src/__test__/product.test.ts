import { sumProductPrices, Product } from "../product";
import { importTestData } from "./helper";

describe("firestore", () => {
  const testData = importTestData("/testData") as { [fn: string]: Product };
  const { iphone, ipad, invalid } = testData;
  test.each([
    [[iphone, ipad], 199600],
    [[iphone], 79800],
    [[iphone, invalid], 79800],
    [[invalid], 0],
  ])(
    "sumProductPrices(): sum %o prices to equal %p",
    async (products, expected) => {
      expect.assertions(1);
      const actual = await sumProductPrices(products);
      expect(actual).toBe(expected);
    }
  );
});
