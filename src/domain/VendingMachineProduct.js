export default class VendingMachineProduct {
  #name;

  #price;

  #stock;

  constructor({ name, price, stock }) {
    this.validateData({ name, price, stock });
    this.#name = name;
    this.#price = price;
    this.#stock = stock;
  }

  validateData({ name, price, stock }) {
    if (name.length > 10) {
      throw new Error('상품명은 10글자를 초과해서는 안됩니다.');
    }

    if (price < 100 || price > 10000) {
      throw new Error(
        '상품 가격은 100원 미만이거나 10000원 초과일 수 없습니다.'
      );
    }

    if (price % 10 !== 0) {
      throw new Error('상품 가격은 10원 단위여야 합니다.');
    }

    if (stock > 20) {
      throw new Error('상품 수량은 20개 초과해서는 안됩니다.');
    }
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }

  get stock() {
    return this.#stock;
  }

  modify({ name, price, stock }) {
    this.validateData({ name, price, stock });
    this.#name = name;
    this.#price = price;
    this.#stock = stock;
  }
}
