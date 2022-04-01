import { ERROR_MESSAGE, PRODUCT_CONDITION } from '../utils/constants';

export class Product {
  #name: string;
  #price: number;
  #quantity: number;

  constructor(name: string, price: number, quantity: number) {
    if (this.validateAllProp(name, price, quantity)) {
      this.setName(name);
      this.setPrice(price);
      this.setQuantity(quantity);
    }
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getQuantity() {
    return this.#quantity;
  }

  setName(name: string) {
    this.#name = name;
  }

  setPrice(price: number) {
    this.#price = price;
  }

  setQuantity(quantity: number) {
    this.#quantity = quantity;
  }

  validateName(name: string) {
    if (name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_PRODUCT_NAME_LENGTH_LIMIT);
    }

    return true;
  }

  validatePrice(price: number) {
    if (price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE) {
      throw new Error(ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE);
    }

    if (price % PRODUCT_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT);
    }

    return true;
  }

  validateQuantity(quantity: number) {
    if (quantity > PRODUCT_CONDITION.MAX_QUANTITY) {
      throw new Error(ERROR_MESSAGE.OVER_PRODUCT_QUANTITY_LIMIT);
    }

    return true;
  }

  validateAllProp(name: string, price: number, quantity: number): boolean {
    return this.validateName(name) && this.validatePrice(price) && this.validateQuantity(quantity);
  }

  getAllProperties() {
    return { name: this.#name, price: this.#price, quantity: this.#quantity };
  }
}
