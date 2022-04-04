import { ProductData, VendingMachineProductDictionary } from './interface';
import { Coin } from './types';

import VendingMachineProduct from './VendingMachineProduct';
import MoneyBox from './MoneyBox';

import { generateUniqueId } from '../utils';

import { ERROR_MESSAGE } from '../constants';
import {
  inValidUnitChange,
  isBelowMinCharge,
  isExceedMaxTotalChange,
  isExceedMaxTotalUserMoney,
  validateData,
} from './validator';

export default class VendingMachine {
  #productList: VendingMachineProductDictionary;
  #moneyBox: MoneyBox;
  #userMoney: number;

  constructor() {
    this.#productList = {};
    this.#moneyBox = new MoneyBox();
    this.#userMoney = 0;
  }

  get productList(): VendingMachineProductDictionary {
    return this.#productList;
  }

  get totalChange(): number {
    return this.#moneyBox.totalChange;
  }

  get coinStatusList(): Coin[] {
    return this.#moneyBox.coinStatusList;
  }

  get userMoney(): number {
    return this.#userMoney;
  }

  addChange(money: number) {
    this.#validateChange(money);

    this.#moneyBox.addChange(money);

    return this.#moneyBox.coinStatusList;
  }

  addProduct(data: ProductData) {
    this.#validateUniqueProductName(data.name);

    const newId = generateUniqueId(Object.keys(this.#productList));
    this.#productList[newId] = new VendingMachineProduct(data);

    return newId;
  }

  updateProduct(productId: string, data: ProductData) {
    this.#validateProductIdInList(productId);
    if (data.name !== this.#productList[productId].name) {
      this.#validateUniqueProductName(data.name);
    }

    this.#productList[productId].modify(data);
  }

  removeProduct(productId: string) {
    this.#validateProductIdInList(productId);
    delete this.#productList[productId];
  }

  addUserMoney(money: number) {
    this.#validateUserMoney(money);
    this.#userMoney += money;
  }

  purchaseProduct(productId: string) {
    const product = this.#productList[productId];
    this.#validatePurchase(product);

    const { name, price, stock } = product;

    this.#userMoney -= price;
    if (stock === 1) {
      delete this.#productList[productId];
      return;
    }

    const newData = { name, price, stock: stock - 1 };
    this.#productList[productId].modify(newData);
  }

  returnChange(): Coin[] {
    if (this.#userMoney === 0) {
      throw new Error(ERROR_MESSAGE.RETURN_CHANGE.NO_USER_MONEY);
    }

    const changeCoins = this.#moneyBox.returnChange(this.#userMoney);
    const totalChangeAmount = changeCoins.reduce(
      (totalReturn, { value, count }) => totalReturn + value * count,
      0
    );

    this.#userMoney -= totalChangeAmount;

    return changeCoins;
  }

  #validateUniqueProductName(name: string) {
    if (Object.values(this.#productList).some((product) => product.name === name)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME.DUPLICATE_VALUE);
    }
  }

  #validateProductIdInList(productId: string) {
    if (this.#productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND);
    }
  }

  #validateChange(money: number) {
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

  #validateUserMoney(money: number) {
    const userMoneyValidator = [
      { testFunc: isBelowMinCharge, errorMsg: ERROR_MESSAGE.USER_MONEY.BELOW_MIN },
      { testFunc: inValidUnitChange, errorMsg: ERROR_MESSAGE.USER_MONEY.INVALID_UNIT },
      {
        testFunc: isExceedMaxTotalUserMoney,
        errorMsg: ERROR_MESSAGE.USER_MONEY.EXCEED_MAX_TOTAL,
      },
    ];
    validateData({ money, userMoney: this.userMoney }, userMoneyValidator);
  }

  #validatePurchase(product: ProductData) {
    if (!product) throw new Error(ERROR_MESSAGE.PRODUCT_ID_NOT_FOUND);

    if (product.price > this.#userMoney) {
      throw new Error(ERROR_MESSAGE.PURCHASE.INSUFFICIENT_MONEY);
    }
  }
}
