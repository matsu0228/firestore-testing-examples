const sum = require("../sum");
const append = require("../append");
const calculate_tax = require("../calculate_tax");

// test.each
// https://jestjs.io/docs/ja/api#1-testeachtablename-fn-timeout
describe("index with each data", () => {
  test.each([
    [1, 2, 3],
    [100, -10, 90],
    [100, -200, -100],
    ["hello ", "world", "hello world"],
    ["hello ", 20, "hello 20"],
    [undefined, null, NaN],
  ])("sum(): adds %p + %p to equal %p", (a, b, expected) => {
    const actual = sum(a, b);
    expect(actual).toBe(expected);
  });
  test.each([
    [1100, 100],
    [1000, 90],
    [55, 5],
    [0, null],
    [-10000, null],
    ["a", null],
  ])("calculate_tax(): %p to equal %p", (price, expected) => {
    const actual = calculate_tax(price);
    expect(actual).toEqual(expected);
  });
  test.each([
    [["a", "b"], 2, ["a", "b", 2]],
    [["a", 2], "b", ["a", 2, "b"]],
    [[null, 2], -100, [null, 2, -100]],
  ])("append(): %p push %p to equal %p", (array, e, expected) => {
    const actual = append(array, e);
    expect(actual).toEqual(expected);
  });
});
