describe("四捨五入", () => {
  /**
   * このようなテストは意味がないので避けるべき、というサンプルコードです
   */
  const round = (base_price: number): number => {
    return Math.round(base_price);
  };
  // ↑プロダクションコード
  test.each([
    [-100.1, -100],
    [10.1, 10],
    [10.4, 10],
    [10.5, 11],
    [10.9, 11],
    [null, 0],
  ])("round: %p が適切に四捨五入して %p と一致すること", (price, expected) => {
    const actual = round(price);
    expect(actual).toBe(expected);
  });
});
