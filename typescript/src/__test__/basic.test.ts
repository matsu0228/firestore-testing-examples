import { sum } from "../sum";

describe("index", () => {
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
});
