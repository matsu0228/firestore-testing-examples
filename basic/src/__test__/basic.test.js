const sum = require("../sum");
const append = require("../append");
describe("index", () => {
  test("sum(): adds 1 + 2 to equal 3", () => {
    const actual = sum(1, 2);
    const expected = 3;
    expect(actual).toBe(expected);
  });
  test("append(): adds [`a`, `b`] + 2 to equal [`a`, `b`, 2]", () => {
    const actual = append(["a", "b"], 2);
    const expected = [`a`, `b`, 2];
    expect(actual).toEqual(expected); // toBe() だと、failする。配列やobjectの比較には toEqual() を利用
    expect(actual).toContain(2);
  });
});
