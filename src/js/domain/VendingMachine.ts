import { Coin, CoinStatus, ProductData, VendingMachineProductDictionary } from './interface';

import VendingMachineProduct from './VendingMachineProduct';
import MoneyBox from './MoneyBox';

import { ERROR_MESSAGE } from '../constants';
import { generateUniqueId } from '../utils';
import {
  inValidUnitChange,
  isBelowMinCharge,
  isExceedMaxTotalChange,
  validateData,
} from './validator';

export default class VendingMachine {
  private _productList: VendingMachineProductDictionary;
  private _moneyBox: MoneyBox;

  constructor() {
    this._productList = {};
    this._moneyBox = new MoneyBox();
  }

  get productList(): VendingMachineProductDictionary {
    return this._productList;
  }

  get totalChange(): number {
    return this._moneyBox.totalChange;
  }

  get coinStatus(): CoinStatus {
    return this._moneyBox.coinStatus;
  }

  addChange(money: number): never | Coin[] {
    this.validateChange(money);

    this._moneyBox.addChange(money);

    return this._moneyBox.coinStatusList;
  }

  addProduct(data: ProductData): never | string {
    this.validateUniqueProductName(data.name);

    const newId = generateUniqueId(Object.keys(this._productList));
    this._productList[newId] = new VendingMachineProduct(data);

    return newId;
  }

  updateProduct(productId: string, data: ProductData): void {
    this.validateProductIdInList(productId);
    if (data.name !== this._productList[productId].name) {
      this.validateUniqueProductName(data.name);
    }

    this._productList[productId].modify(data);
  }

  removeProduct(productId: string): void {
    this.validateProductIdInList(productId);
    delete this._productList[productId];
  }

  private validateChange(money: number): never | void {
    const changeValidator = [
      { testFunc: isBelowMinCharge, errorMsg: ERROR_MESSAGE.CHANGE.BELOW_MIN },
      { testFunc: inValidUnitChange, errorMsg: ERROR_MESSAGE.CHANGE.INVALID_UNIT },
      {
        testFunc: isExceedMaxTotalChange,
        errorMsg: ERROR_MESSAGE.CHANGE.EXCEED_MAX_TOTAL,
      },
    ];

    validateData({ money, totalChange: this.totalChange }, changeValidator);
  }

  private validateUniqueProductName(name): never | void {
    if (Object.values(this._productList).some((product) => product.name === name)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME.DUPLICATE_VALUE);
    }
  }

  private validateProductIdInList(productId: string): never | void {
    if (this._productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND);
    }
  }
}
