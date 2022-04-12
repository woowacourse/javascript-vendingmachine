import { ERROR_MESSAGE, RULES } from '../constants';
import { Product, Coin } from '../interfaces/VendingMachine.interface';
import {
  isValidProductPrice,
  isValidProductAmount,
  isValidProductNameLength,
  isUnitOfTen,
  isPositiveInteger,
  isValidPutMoney,
  isValidChangeCoins,
} from './validator';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

class VendingMachine {
  private changes: Coin;
  private products: Array<Product>;
  private totalMoney: number;
  private userMoney: number;

  constructor() {
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.products = [];
    this.totalMoney = 0;
    this.userMoney = 0;
  }

  getChanges() {
    return this.changes;
  }

  getProduct(name: string) {
    return this.products[this.findProductIndex(name)];
  }

  getProducts() {
    return this.products;
  }

  getTotalMoney() {
    return this.totalMoney;
  }

  getUserMoney() {
    return this.userMoney;
  }

  getUserChanges() {
    const { userChanges, userMoney } = this.getUserChangeCoins(this.userMoney);
    this.checkUserChangeValidate(this.userMoney, userChanges);

    const changedMoney = this.userMoney - userMoney;

    this.totalMoney -= changedMoney;
    this.userMoney = userMoney;

    return userChanges;
  }
  private checkUserChangeValidate(userMoney: number, userChanges: Coin) {
    if (!isValidPutMoney(userMoney)) {
      throw new Error(ERROR_MESSAGE.EMPTY_PUT_MONEY);
    }

    if (!isValidChangeCoins(userChanges)) {
      throw new Error(ERROR_MESSAGE.EMPTY_CHANGES);
    }
  }

  getUserChangeCoins(userMoney: number) {
    const coinBox = RULES.CHANGE_UNITS;
    const userChanges = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };

    coinBox.forEach(coin => {
      const changeKey = `coin${coin}`;
      const changeAmount = this.changes[changeKey];
      const count = Math.floor(userMoney / coin);

      if (userMoney <= 0 || changeAmount <= 0) return;

      if (count >= changeAmount) {
        this.changes[changeKey] -= changeAmount;
        userChanges[changeKey] += changeAmount;
        userMoney -= changeAmount * coin;
      }

      if (count < changeAmount) {
        this.changes[changeKey] -= count;
        userChanges[changeKey] += count;
        userMoney -= count * coin;
      }
    });

    return { userChanges, userMoney };
  }

  addChange(money: number) {
    this.checkChangeValidate(money);
    this.totalMoney += money;
    this.makeChangesToCoin(money);
  }

  private checkChangeValidate(money: number) {
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

  private makeChangesToCoin(money: number) {
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

  private getChangeCoin(money: number) {
    const coins = RULES.CHANGE_UNITS.filter(coin => coin <= money);
    const index = getRandomInt(coins.length);
    return coins[index];
  }

  putMoney(money: number) {
    this.checkUserMoneyValidate(money);
    this.userMoney += money;
  }

  private checkUserMoneyValidate(money: number) {
    if (!isPositiveInteger(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }

    if (!isUnitOfTen(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    }

    if (this.userMoney + money > RULES.MAX_USER_MONEY) {
      throw new Error(ERROR_MESSAGE.TOO_MUCH_USER_MONEY);
    }
  }

  purchaseProduct(newProduct: Product, quantity: number) {
    const { name, price, amount } = newProduct;
    this.modifyProduct(name, newProduct, false);
    this.userMoney -= quantity * price;
  }

  addProduct(product: Product) {
    this.checkProductValidate(product);
    this.products.push(product);
  }

  modifyProduct(oldProductName: string, newProduct: Product, canValidCheck = true) {
    const oldProductIndex = this.findProductIndex(oldProductName);
    if (canValidCheck) this.checkProductValidate(newProduct, oldProductIndex);
    this.products[oldProductIndex] = newProduct;
  }

  removeProduct(name: string) {
    const productIndex = this.findProductIndex(name);
    const isExist = productIndex >= 0;

    if (isExist) {
      this.products.splice(productIndex, 1);
    }
  }

  private findProductIndex(name: string) {
    return this.products.findIndex(product => product.name === name);
  }

  private checkProductValidate(product: Product, originalIndex: number = RULES.NOT_EXIST_INDEX) {
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
}

const vendingMachine = new VendingMachine();

export default vendingMachine;
