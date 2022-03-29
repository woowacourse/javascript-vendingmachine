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
  #productList: VendingMachineProductDictionary;
  #moneyBox: MoneyBox;

  constructor() {
    this.#productList = {};
    this.#moneyBox = new MoneyBox();
  }

  get productList(): VendingMachineProductDictionary {
    return this.#productList;
  }

  get totalChange(): number {
    return this.#moneyBox.totalChange;
  }

  get coinStatus(): CoinStatus {
    return this.#moneyBox.coinStatus;
  }

  addChange(money: number): never | Coin[] {
    this.#validateChange(money);

    this.#moneyBox.addChange(money);

    return this.#moneyBox.coinStatusList;
  }

  addProduct(data: ProductData): never | string {
    this.#validateUniqueProductName(data.name);

    const newId = generateUniqueId(Object.keys(this.#productList));
    this.#productList[newId] = new VendingMachineProduct(data);

    return newId;
  }

  updateProduct(productId: string, data: ProductData): void {
    this.#validateProductIdInList(productId);
    if (data.name !== this.#productList[productId].name) {
      this.#validateUniqueProductName(data.name);
    }

    this.#productList[productId].modify(data);
  }

  removeProduct(productId: string): void {
    this.#validateProductIdInList(productId);
    delete this.#productList[productId];
  }

  #validateChange(money: number): never | void {
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

  #validateUniqueProductName(name): never | void {
    if (Object.values(this.#productList).some((product) => product.name === name)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME.DUPLICATE_VALUE);
    }
  }

  #validateProductIdInList(productId: string): never | void {
    if (this.#productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND);
    }
  }
}
