import { ERROR_MESSAGE, PRODUCT_CONDITION } from '../utils/constants';
import { ProductProps } from '../utils/interface';
import { validator } from '../utils/validator';

interface ProductInterface {
  getName();
  getPrice();
  getQuantity();
  getAllProperties();
  setName(name: ProductProps['name']);
  setPrice(price: ProductProps['price']);
  setQuantity(quantity: ProductProps['quantity']);
  decreaseQuantity(quantity: ProductProps['quantity']);
  isValidatedAllProp({ name, price, quantity }: ProductProps): boolean;
}

export class Product implements ProductInterface {
  #name: ProductProps['name'];
  #price: ProductProps['price'];
  #quantity: ProductProps['quantity'];

  constructor({ name, price, quantity }: ProductProps) {
    if (this.isValidatedAllProp({ name, price, quantity })) {
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

  getAllProperties() {
    return { name: this.#name, price: this.#price, quantity: this.#quantity };
  }

  setName(name: ProductProps['name']) {
    this.#name = name;
  }

  setPrice(price: ProductProps['price']) {
    this.#price = price;
  }

  setQuantity(quantity: ProductProps['quantity']) {
    this.#quantity = quantity;
  }

  decreaseQuantity(quantity: ProductProps['quantity'] = 1) {
    this.#quantity -= quantity;
  }

  #isValidatedName(name: ProductProps['name']) {
    validator([
      {
        checker: () => name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH,
        errorMessage: ERROR_MESSAGE.OVER_PRODUCT_NAME_LENGTH_LIMIT,
      },
    ]);

    return true;
  }

  #isValidatedPrice(price: ProductProps['price']) {
    validator([
      {
        checker: () => price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE,
        errorMessage: ERROR_MESSAGE.NOT_WITHIN_PRODUCT_PRICE_RANGE,
      },
      {
        checker: () => price % PRODUCT_CONDITION.UNIT_PRICE !== 0,
        errorMessage: ERROR_MESSAGE.NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT,
      },
    ]);

    return true;
  }

  #isValidatedQuantity(quantity: ProductProps['quantity']) {
    validator([
      {
        checker: () => quantity > PRODUCT_CONDITION.MAX_QUANTITY,
        errorMessage: ERROR_MESSAGE.OVER_PRODUCT_QUANTITY_LIMIT,
      },
    ]);

    return true;
  }

  isValidatedAllProp({ name, price, quantity }: ProductProps): boolean {
    return (
      this.#isValidatedName(name) &&
      this.#isValidatedPrice(price) &&
      this.#isValidatedQuantity(quantity)
    );
  }
}
