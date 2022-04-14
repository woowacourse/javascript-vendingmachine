import { ALERT_MESSAGE, ERROR_MESSAGE, RULES } from '../constants';
import { Product, Coin } from '../interfaces/VendingMachine.interface';
import { getRandomInt } from '../utils/utils';
import {
  isValidProductPrice,
  isValidProductAmount,
  isValidProductNameLength,
  isUnitOfTen,
  isPositiveInteger,
  isDuplicatedName,
} from './validator';

class VendingMachine {
  private products: Array<Product>;
  private changes: Coin;
  private userChanges: Coin;
  private totalMoney: number;
  private userMoney: number;
  private availableCoinTypeList: Array<number>;

  constructor() {
    this.products = [];
    this.availableCoinTypeList = [500, 100, 50, 10, 0];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.userChanges = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
    this.userMoney = 0;
  }

  getProducts() {
    return this.products;
  }

  getChanges() {
    return this.changes;
  }

  getUserChanges() {
    return this.userChanges;
  }

  getTotalMoney() {
    return this.totalMoney;
  }

  getUserMoney() {
    return this.userMoney;
  }

  addProduct(product: Product) {
    this.checkProductValidate(product);
    this.products.push(product);
    return ALERT_MESSAGE.ADD_PRODUCT_SUCCESS(product.name);
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

    return ALERT_MESSAGE.DELETE_PRODUCT_SUCCESS(name);
  }

  modifyProduct(oldProductName: string, newProduct: Product) {
    const oldProductIndex = this.findProductIndex(oldProductName);
    this.checkProductValidate(newProduct, oldProductIndex);
    this.products[oldProductIndex] = newProduct;
    return ALERT_MESSAGE.MODIFY_PRODUCT_SUCCESS(newProduct.name);
  }

  inputChanges(money: number) {
    this.checkInputChangesValidate(money);
    this.totalMoney += money;
    this.makeChangesToCoin(money);
    return ALERT_MESSAGE.ADD_CHARGE_SUCCESS(money);
  }

  inputUserMoney(money: number) {
    this.checkInputMoneyValidate(money);
    this.userMoney += money;
    return ALERT_MESSAGE.INPUT_MONEY_SUCCESS(money);
  }

  returnChanges() {
    const coin = this.getChangeCoin(this.userMoney);
    this.userMoney -= coin;

    switch (coin) {
      case 500:
        this.changes.coin500 -= 1;
        this.userChanges.coin500 += 1;
        break;
      case 100:
        this.changes.coin100 -= 1;
        this.userChanges.coin100 += 1;
        break;
      case 50:
        this.changes.coin50 -= 1;
        this.userChanges.coin50 += 1;
        break;
      case 10:
        this.changes.coin10 -= 1;
        this.userChanges.coin10 += 1;
        break;
      case 0:
        if (this.userMoney > 0) {
          throw new Error(ERROR_MESSAGE.NOT_ENOUGH_RETURN_CHANGE);
        }
        break;
    }

    if (this.userMoney >= RULES.MINIMUM_CHANGE) {
      this.returnChanges();
    }

    return ALERT_MESSAGE.RETURN_CHARGE_SUCCESS;
  }

  purchaseProduct(productName: string) {
    const productIndex = this.findProductIndex(productName);
    const productPrice = this.products[productIndex].price;
    const productAmount = this.products[productIndex].amount;

    if (this.userMoney < productPrice) {
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
    }

    if (productAmount < 1) {
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_AMOUNT);
    }

    this.userMoney -= productPrice;
    this.products[productIndex].amount -= 1;

    return ALERT_MESSAGE.PURCHASE_PRODUCT_SUCCESS(productName);
  }

  private makeChangesToCoin(money: number) {
    const coin = this.getRandomChangeCoin(money);
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
        break;
    }

    if (money >= RULES.MINIMUM_CHANGE) {
      this.makeChangesToCoin(money);
    }
  }

  private getChangeCoin(money: number) {
    const coins = this.availableCoinTypeList.filter(coin => {
      if (money < coin) {
        return false;
      }

      switch (coin) {
        case 500:
          if (this.changes.coin500 > 0) {
            return true;
          }
          break;
        case 100:
          if (this.changes.coin100 > 0) {
            return true;
          }
          break;
        case 50:
          if (this.changes.coin50 > 0) {
            return true;
          }
          break;
        case 10:
          if (this.changes.coin10 > 0) {
            return true;
          }
          break;
        case 0:
          return true;
      }

      return false;
    });

    return coins[0];
  }

  private getRandomChangeCoin(money: number) {
    const coins = this.availableCoinTypeList.filter(coin => coin <= money);
    const index = getRandomInt(coins.length);
    return coins[index];
  }

  private checkProductValidate(product: Product, originalIndex: number = RULES.NOT_EXIST_INDEX) {
    if (isDuplicatedName(this.findProductIndex(product.name), originalIndex)) {
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

  private checkInputChangesValidate(money: number) {
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

  private checkInputMoneyValidate(money: number) {
    if (!isPositiveInteger(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }

    if (!isUnitOfTen(money)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_UNIT_OF_TEN);
    }

    if (this.userMoney + money > RULES.MAX_VENDING_MACHINE_INPUT_MONEY) {
      throw new Error(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_INPUT_MONEY);
    }
  }

  initialize() {
    /* 테스트 용도로 작성된 초기화 함수입니다. 실제 로직에선 사용되지 않습니다. */
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.userChanges = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
    this.userMoney = 0;
  }
}

const vendingMachine = new VendingMachine();

export default vendingMachine;
