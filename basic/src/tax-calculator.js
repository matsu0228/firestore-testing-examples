class TaxCalculator {
  constructor(decimal_point_operator) {
    this.tax_rate = 10; // jsの仕様で taxed * 100 / rate としなければ誤差が出てしまう
    const default_operator = "floor";
    if (["round", "ceil", "floor"].includes(decimal_point_operator)) {
      this.decimal_point_operator = decimal_point_operator;
      return;
    }
    console.log(`WARN: set default operator: ${default_operator}`);
    this.decimal_point_operator = default_operator;
  }

  isValidPrice(price) {
    if (typeof price != "number") {
      return false;
    }
    if (price <= 0) {
      return false;
    }
    return true;
  }

  calculateBasePrice(price) {
    if (!this.isValidPrice(price)) {
      return null;
    }
    const base_price_raw = (price * 100) / (100 + this.tax_rate);
    switch (this.decimal_point_operator) {
      case "round":
        return Math.round(base_price_raw);
      case "ceil":
        return Math.ceil(base_price_raw);
      default:
        return Math.floor(base_price_raw);
    }
  }
  calculateTax(price) {
    const base_price = this.calculateBasePrice(price);
    if (!base_price) {
      return null;
    }
    return price - base_price;
  }
}
module.exports = TaxCalculator;
