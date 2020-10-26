import { calculatePrices } from "../firestore";
import rewire = require("rewire");
let RewiredComponent = rewire("../firestore");

const returnProducts: db.Product[] = [
  { id: "ipad", name: "ipad", price: 119800 },
  { id: "iphone", name: "iphone", price: 79800 },
];
const fetchProductsSpy = jest
  .spyOn(db, "fetchProducts")
  .mockReturnValueOnce(async (ids: string[]) => returnProducts);

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
      const actual = await db.calculatePrices(productIds);
      expect(actual).toBe(expected);
      expect(fetchProductsSpy).toHaveBeenCalled();
    }
  );
});
