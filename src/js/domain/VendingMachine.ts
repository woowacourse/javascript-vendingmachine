import { CoinStatus, ProductData, VendingMachineProductDictionary } from './interface';

import VendingMachineProduct from './VendingMachineProduct';
import MoneyBox from './MoneyBox';

import { ERROR_MESSAGE } from '../constants';
import { generateRandomHexString } from '../utils';
import {
  inValidUnitMoney,
  isBelowMinCharge,
  isExceedMaxTotalChange,
  isExceedMaxTotalMoney,
  validateData,
} from './validator';

export default class VendingMachine {
  #productList: VendingMachineProductDictionary;
  #moneyBox: MoneyBox;
  #totalMoney: number;

  constructor() {
    this.#productList = {};
    this.#moneyBox = new MoneyBox();
    this.#totalMoney = 0;
  }

  get productList(): VendingMachineProductDictionary {
    return this.#productList;
  }

  get totalChange() {
    return this.#moneyBox.totalChange;
  }

  get coinStatus(): CoinStatus {
    return this.#moneyBox.coinStatus;
  }

  get totalMoney() {
    return this.#totalMoney;
  }

  addChange(money: number): void {
    if (this.#validateChange(money)) {
      this.#moneyBox.addChange(money);
    }
  }

  addProduct(data: ProductData): string {
    this.#validateUniqueProductName(data.name);

    const newId = generateRandomHexString();
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

  sellProduct(productId: string): void {
    if (this.#productList[productId].stock === 0) {
      throw new Error('해당 상품은 품절입니다.');
    }
    if (this.#validateProduct(productId)) {
      this.#productList[productId].sell();
      this.#totalMoney -= this.#productList[productId].price;
    }
  }

  giveChange(): CoinStatus {
    const { totalChange } = this.#moneyBox;
    const coinStatus = this.#moneyBox.giveChange(this.#totalMoney);
    this.#totalMoney = Math.max(this.#totalMoney - totalChange, 0);
    return coinStatus;
  }

  #validateProduct(productId: string): boolean {
    if (this.#productList[productId].price > this.#totalMoney) {
      throw new Error('금액이 부족합니다');
    }
    this.#validateProductIdInList(productId);
    return true;
  }

  removeProduct(productId: string): void {
    this.#validateProductIdInList(productId);
    delete this.#productList[productId];
  }

  #validateChange(money: number): boolean {
    const changeValidator = [
      { testFunc: isBelowMinCharge, errorMsg: ERROR_MESSAGE.BELOW_MIN_CHANGE },
      { testFunc: inValidUnitMoney, errorMsg: ERROR_MESSAGE.INVALID_UNIT_CHANGE },
      {
        testFunc: isExceedMaxTotalChange,
        errorMsg: ERROR_MESSAGE.EXCEED_MAX_TOTAL_CHANGE,
      },
    ];

    return validateData({ money, totalMoney: this.totalChange }, changeValidator);
  }

  #validateUniqueProductName(name): void {
    if (Object.values(this.#productList).some((product) => product.name === name)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME);
    }
  }

  #validateProductIdInList(productId: string): void {
    if (this.#productList[productId] === undefined) {
      throw new Error(ERROR_MESSAGE.NOT_FOUND_PRODUCT_ID);
    }
  }

  insertMoney(money: number): void {
    if (this.#validateInputMoney(money)) {
      this.#totalMoney += money;
    }
  }

  #validateInputMoney(money: number): boolean {
    const inputMoneyValidator = [
      { testFunc: inValidUnitMoney, errorMsg: '10원단위로 금액을 투입해주세요' },
      {
        testFunc: isExceedMaxTotalMoney,
        errorMsg: '투입금액은 최대 10,000원 까지입니다.',
      },
    ];
    return validateData({ money, totalMoney: this.#totalMoney }, inputMoneyValidator);
  }
}
