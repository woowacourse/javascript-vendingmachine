import { PRODUCT_CONDITION } from '../utils/constants';

export class Product {
  private name: string;
  private price: number;
  private quantity: number;

  constructor(name: string, price: number, quantity: number) {
    try {
      this.validateAllProp(name, price, quantity);
      this.setName(name);
      this.setPrice(price);
      this.setQuantity(quantity);
    } catch (err) {
      throw err;
    }
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
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

  validateName(name: string) {
    if (name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH) {
      throw new Error('10글자 미만의 이름을 넣어주세요~');
    }
  }

  validatePrice(price: number) {
    if (price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE) {
      throw new Error('100원 이상, 10,000원 이하의 돈을 넣어주세요~');
    }

    if (price % PRODUCT_CONDITION.UNIT_PRICE !== 0) {
      throw new Error('10원단위로 돈을 넣어주세요~');
    }
  }

  validateQuantity(quantity: number) {
    if (quantity > PRODUCT_CONDITION.MAX_QUANTITY) {
      throw new Error('상품수량은 최대 20개까지만 가능합니다~');
    }
  }

  validateAllProp(name: string, price: number, quantity: number) {
    try {
      this.validateName(name);
      this.validatePrice(price);
      this.validateQuantity(quantity);
    } catch (err) {
      throw err;
    }
  }

  getAllProperties() {
    return { name: this.name, price: this.price, quantity: this.quantity };
  }
}
