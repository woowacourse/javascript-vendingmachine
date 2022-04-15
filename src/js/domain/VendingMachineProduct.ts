import { ProductData } from './interface';
import {
  hasEmptyInput,
  isInvalidUnitPrice,
  isNotIntegerStock,
  isOverMaxLengthName,
  isPriceOutOfRange,
  isStockOutOfRange,
  validateData,
} from './validator';
import { ERROR_MESSAGE } from '../constants';

export default class VendingMachineProduct {
  #name: string;
  #price: number;
  #stock: number;

  constructor({ name, price, stock }: ProductData) {
    if (this.validateProduct({ name, price, stock })) {
      this.#name = name;
      this.#price = price;
      this.#stock = stock;
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

  modify({ name, price, stock }: ProductData): void {
    if (this.validateProduct({ name, price, stock })) {
      this.#name = name;
      this.#price = price;
      this.#stock = stock;
    }
  }

  sell(): void {
    this.#stock -= 1;
  }

  private validateProduct(data: ProductData): boolean {
    const productValidator = [
      { testFunc: hasEmptyInput, errorMsg: ERROR_MESSAGE.CONTAIN_EMPTY_FIELD_IN_FORM },
      {
        testFunc: isOverMaxLengthName,
        errorMsg: ERROR_MESSAGE.EXCEED_MAX_PRODUCT_NAME_LENGTH,
      },
      { testFunc: isPriceOutOfRange, errorMsg: ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE },
      {
        testFunc: isInvalidUnitPrice,
        errorMsg: ERROR_MESSAGE.INVALID_UNIT_PRODUCT_PRICE,
      },
      { testFunc: isStockOutOfRange, errorMsg: ERROR_MESSAGE.OUT_OF_PRODUCT_STOCK_RANGE },
      { testFunc: isNotIntegerStock, errorMsg: ERROR_MESSAGE.INVALID_PRODUCT_STOCK },
    ];

    return validateData(data, productValidator);
  }
}
