import { PRODUCT_CONDITION } from '../utils/domain.const';

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
    try {
      this.validateName(name);
      this.name = name;
    } catch (err) {
      throw err;
    }
  }

  validateName(name: string) {
    if (name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH) {
      throw new Error('10글자 미만의 이름을 넣어주세요~');
    }
    return;
  }

  setPrice(price: number) {
    try {
      this.validatePrice(price);
      this.price = price;
    } catch (err) {
      throw err;
    }
  }

  validatePrice(price: number) {
    if (price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE) {
      throw new Error('100원 이상, 10,000원 이하의 돈을 넣어주세요~');
    }
    if (price % PRODUCT_CONDITION.UNIT_PRICE !== 0) {
      throw new Error('10원단위로 돈을 넣어주세요~');
    }
    return;
  }

  setQuantity(quantity: number) {
    try {
      this.validateQuantity(quantity);
      this.quantity = quantity;
    } catch (err) {
      throw err;
    }
  }

  validateQuantity(quantity: number) {
    if (quantity > PRODUCT_CONDITION.MAX_QUANTITY) {
      throw new Error('상품수량은 최대 20개까지만 가능합니다~');
    }

    return;
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

  getAllProperties() {
    return { name: this.name, price: this.price, quantity: this.quantity };
  }
}
