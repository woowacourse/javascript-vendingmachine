import { PRODUCT_CONDITION } from '../constants/domain';
import { ERR_PRODUCT } from '../constants/errorMessage';

export class Product {
  private name: string;
  private price: number;
  private quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.setName(name);
    this.setPrice(price);
    this.setQuantity(quantity);
  }

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }
  setQuantity(quantity: number) {
    this.quantity = quantity;
  }
  /*
  validateName(name: string) {
    if (name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH) {
      throw new Error(ERR_PRODUCT.LONG_NAME);
    }
    return;
  }

  validatePrice(price: number) {
    if (price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE) {
      throw new Error(ERR_PRODUCT.OUT_OF_RANGE_INPUT);
    }
    if (price % PRODUCT_CONDITION.UNIT_PRICE !== 0) {
      throw new Error(ERR_PRODUCT.SMALL_INPUT_THAN_UNIT);
    }
    return;
  }

  validateQuantity(quantity: number) {
    if (quantity > PRODUCT_CONDITION.MAX_QUANTITY) {
      throw new Error(ERR_PRODUCT.EXCEED_MAX_QUANTITY);
    }

    return;
  }

  validateAllProp(name, price, quantity) {
    try {
      this.validateName(name);
      this.validatePrice(price);
      this.validateQuantity(quantity);
    } catch (err) {
      throw err;
    }
  }
*/
  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

  getAllProperties() {
    return { name: this.name, price: this.price, quantity: this.quantity };
  }
}
