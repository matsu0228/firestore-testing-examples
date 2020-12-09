describe("passCode", () => {
  const isValidLength = (l: number): boolean => {
    return l >= 4 && l <= 6;
  };
  // ↑プロダクションコード
  test.each([
    [-1, false],
    [3, false],
    [4, true],
    [5, true],
    [6, true],
    [7, false],
    [100, false],
    [null, false],
  ])(
    "isValidLength: %p が適切なパスコード長さか %p と一致すること",
    (length, expected) => {
      const actual = isValidLength(length);
      expect(actual).toBe(expected);
    }
  );
});
