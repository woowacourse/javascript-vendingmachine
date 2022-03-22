import { ERROR_MESSAGE, PRODUCT_RULES } from '../constants';

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
    if (name.length > PRODUCT_RULES.MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAX_PRODUCT_NAME_LENGTH);
    }

    if (price < PRODUCT_RULES.MIN_PRICE || price > PRODUCT_RULES.MAX_PRICE) {
      throw new Error(ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE);
    }

    if (price % PRODUCT_RULES.PRICE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_UNIT_PRODUCT_PRICE);
    }

    if (stock > PRODUCT_RULES.MAX_STOCK) {
      throw new Error(ERROR_MESSAGE.EXCEED_MAX_PRODUCT_STOCK);
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
