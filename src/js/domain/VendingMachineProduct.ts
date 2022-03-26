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
  private _name: string;
  private _price: number;
  private _stock: number;

  constructor({ name, price, stock }: ProductData) {
    this.validateProduct({ name, price, stock });

    this._name = name;
    this._price = price;
    this._stock = stock;
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
    this.validateProduct({ name, price, stock });

    this._name = name;
    this._price = price;
    this._stock = stock;
  }

  validateProduct(data: ProductData) {
    const productValidator = [
      { testFunc: hasEmptyInput, errorMsg: ERROR_MESSAGE.CONTAIN_EMPTY_FIELD_IN_FORM },
      {
        testFunc: isOverMaxLengthName,
        errorMsg: ERROR_MESSAGE.EXCEED_MAX_PRODUCT_NAME_LENGTH,
      },
      { testFunc: isPriceOutOfRange, errorMsg: ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE },
      { testFunc: isInvalidUnitPrice, errorMsg: ERROR_MESSAGE.INVALID_UNIT_PRODUCT_PRICE },
      { testFunc: isStockOutOfRange, errorMsg: ERROR_MESSAGE.OUT_OF_PRODUCT_STOCK_RANGE },
      { testFunc: isNotIntegerStock, errorMsg: ERROR_MESSAGE.INVALID_PRODUCT_STOCK },
    ];

    validateData(data, productValidator);
  }
}
