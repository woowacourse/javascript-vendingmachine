import { ERROR_MESSAGE, PRODUCT_RULES } from '../constants';

interface ProductData {
  name: string;
  price: number;
  stock: number;
}

export default class VendingMachineProduct {
  private _name: string;

  private _price: number;

  private _stock: number;

  constructor({ name, price, stock }: ProductData) {
    this.validateData({ name, price, stock });

    this._name = name;
    this._price = price;
    this._stock = stock;
  }

  validateData({ name, price, stock }: ProductData): never | void {
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

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get stock(): number {
    return this._stock;
  }

  modify({ name, price, stock }: ProductData): void {
    this.validateData({ name, price, stock });

    this._name = name;
    this._price = price;
    this._stock = stock;
  }
}
