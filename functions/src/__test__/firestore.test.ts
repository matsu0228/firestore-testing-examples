import { calculatePrices } from "../firestore";

describe("firestore", () => {
  test.each([
    [["iphone", "ipad"], 199600],
    [["iphone"], 79800],
    [["iphone", "invalid product"], 79800],
    [["invalid product"], 0],
  ])(
    "calculatePrices(): sum %p prices to equal %p",
    async (productIds, expected) => {
      expect.assertions(1);
      const actual = await calculatePrices(productIds);
      expect(actual).toBe(expected);
    }
  );
});
