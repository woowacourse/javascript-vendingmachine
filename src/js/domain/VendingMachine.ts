import {
  Coin,
  CoinStatus,
  ProductData,
  VendingMachineProductDictionary,
} from './interface';

import VendingMachineProduct from './VendingMachineProduct';
import MoneyBox from './MoneyBox';

import { ERROR_MESSAGE } from '../constants';
import { generateUniqueId } from '../utils';
import {
  inValidUnitChange,
  isBelowMinCharge,
  isExceedMaxTotalChange,
  isExceedMaxTotalMoneyInsert,
  validateData,
} from './validator';

export default class VendingMachine {
  #productList: VendingMachineProductDictionary;
  #moneyBox: MoneyBox;
  #moneyInsert: number;

  constructor() {
    this.#productList = {};
    this.#moneyBox = new MoneyBox();
    this.#moneyInsert = 0;
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

  get moneyInsert(): number {
    return this.#moneyInsert;
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

  addMoneyInsert(money: number) {
    this.#validateMoneyInsert(money);
    this.#moneyInsert += money;
  }

  purchaseProduct(productId) {
    const product = this.#productList[productId];
    this.#validatePurchase(product);

    const { name, price, stock } = product;

    this.#moneyInsert -= price;
    if (stock === 1) {
      delete this.#productList[productId];
      return;
    }

    const newData: ProductData = { name, price, stock: stock - 1 };
    this.#productList[productId].modify(newData);
  }

  #validatePurchase(product) {
    if (!product) throw new Error(ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND);

    if (product.price > this.#moneyInsert) {
      throw new Error(ERROR_MESSAGE.PURCHASE.INSUFFICIENT_MONEY);
    }
  }

  returnChange() {
    if (this.#moneyInsert === 0) {
      throw new Error(ERROR_MESSAGE.RETURN_CHANGE.NO_MONEY_INSERT);
    }

    const changeCoins = this.#moneyBox.returnChange(this.#moneyInsert);
    const totalChangeAmount = changeCoins.reduce(
      (totalReturn, { value, count }) => totalReturn + value * count,
      0
    );

    this.#moneyInsert -= totalChangeAmount;

    return changeCoins;
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

  #validateMoneyInsert(money: number) {
    const moneyInsertValidator = [
      { testFunc: isBelowMinCharge, errorMsg: ERROR_MESSAGE.MONEY_INSERT.BELOW_MIN },
      { testFunc: inValidUnitChange, errorMsg: ERROR_MESSAGE.MONEY_INSERT.INVALID_UNIT },
      {
        testFunc: isExceedMaxTotalMoneyInsert,
        errorMsg: ERROR_MESSAGE.MONEY_INSERT.EXCEED_MAX_TOTAL,
      },
    ];
    validateData({ money, moneyInsert: this.moneyInsert }, moneyInsertValidator);
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
