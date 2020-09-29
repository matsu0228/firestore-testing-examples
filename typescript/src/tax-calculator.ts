export type TaxOperator = "round" | "ceil" | "floor";

export class TaxCalculator {
  private tax_rate: number;
  constructor(private decimal_point_operator?: TaxOperator) {
    this.tax_rate = 10; //jsの仕様で untaxed * rate / 100としなければ誤差が出てしまう
    const default_operator = "floor";
    if (!decimal_point_operator) {
      console.log(`WARN: set default operator: ${default_operator}`);
      this.decimal_point_operator = default_operator;
      return;
    }
    this.decimal_point_operator = decimal_point_operator;
  }

  isValidPrice(price: number): boolean {
    if (typeof price != "number") {
      return false;
    }
    if (price <= 0) {
      return false;
    }
    return true;
  }

  calculateBasePrice(price: number): number {
    if (!this.isValidPrice(price)) {
      return null;
    }
    const base_price_raw = (price * 100) / (100 + this.tax_rate);
    // console.log("base price raw:", price, this.tax_rate, base_price_raw);
    switch (this.decimal_point_operator) {
      case "round":
        return Math.round(base_price_raw);
      case "ceil":
        return Math.ceil(base_price_raw);
      default:
        return Math.floor(base_price_raw);
    }
  }
  calculateTax(price: number): number {
    const base_price = this.calculateBasePrice(price);
    if (!base_price) {
      return null;
    }
    return price - base_price;
  }
}
