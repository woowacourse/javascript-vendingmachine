import { ERROR_MESSAGE, RULES } from '../constants';
import { Product, Coin } from '../interfaces/VendingMachine.interface';
import {
  isValidProductPrice,
  isValidProductAmount,
  isValidProductNameLength,
  isUnitOfTen,
  isPositiveInteger,
} from './validator';

class VendingMachine {
  private products: Array<Product>;
  private changes: Coin;
  private totalMoney: number;

  constructor() {
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
  }

  getProducts() {
    return this.products;
  }

  getChanges() {
    return this.changes;
  }

  getTotalMoney() {
    return this.totalMoney;
  }

  addProduct(product: Product) {
    this.checkProductValidate(product);
    this.products.push(product);
  }

  findProductIndex(name: string) {
    return this.products.findIndex(product => product.name === name);
  }

  removeProduct(name: string) {
    const productIndex = this.findProductIndex(name);
    const isExist = productIndex >= 0;

    if (isExist) {
      this.products.splice(productIndex, 1);
    }
  }

  modifyProduct(oldProductName: string, newProduct: Product) {
    const oldProductIndex = this.findProductIndex(oldProductName);
    this.checkProductValidate(newProduct, oldProductIndex);
    this.products[oldProductIndex] = newProduct;
  }

  addChange(money: number) {
    this.checkChangeValidate(money);
    this.totalMoney += money;
    this.makeChangesToCoin(money);
  }

  makeChangesToCoin(money: number) {
    const coin = this.getChangeCoin(money);
    money -= coin;

    switch (coin) {
      case 500:
        this.changes.coin500 += 1;
        break;
      case 100:
        this.changes.coin100 += 1;
        break;
      case 50:
        this.changes.coin50 += 1;
        break;
      case 10:
        this.changes.coin10 += 1;
    }

    if (money >= RULES.MINIMUM_CHANGE) {
      this.makeChangesToCoin(money);
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getChangeCoin(money: number) {
    const coins = [500, 100, 50, 10].filter(coin => coin <= money);
    const index = this.getRandomInt(coins.length);
    return coins[index];
  }

  checkProductValidate(product: Product, originalIndex: number = RULES.NOT_EXIST_INDEX) {
    const productIndex = this.findProductIndex(product.name);
    const isExist = productIndex >= 0;
    const isAddWithDuplicatedName = isExist && originalIndex === RULES.NOT_EXIST_INDEX;
    const isModifyWithDuplicateName = isExist && originalIndex !== productIndex;

    if (isAddWithDuplicatedName || isModifyWithDuplicateName) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME_IS_DUPLICATED);
    }

    if (!isValidProductNameLength(product.name)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);
    }

    if (!isValidProductPrice(product.price)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_PRICE);
    }

    if (!isValidProductAmount(product.amount)) {
      throw new Error(ERROR_MESSAGE.PRODUCT_AMOUNT);
    }
  }

  checkChangeValidate(money: number) {
    if (!isPositiveInteger(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }

    if (!isUnitOfTen(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    }

    if (this.totalMoney + money > RULES.MAX_VENDING_MACHINE_CHANGE) {
      throw new Error(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_CHANGE);
    }
  }
}

const vendingMachine = new VendingMachine();

export default vendingMachine;
