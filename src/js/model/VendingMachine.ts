import { ALERT_MESSAGE, ERROR_MESSAGE, RULES } from '../constants';
import { Coin, Product } from '../interfaces/VendingMachine.interface';
import CoinModel from './CoinModel';

import {
  isValidProductPrice,
  isValidProductAmount,
  isValidProductNameLength,
  isUnitOfTen,
  isPositiveInteger,
  isDuplicatedName,
} from './validator';

export class VendingMachine {
  protected products: Array<Product>;
  protected userMoney: Coin;
  protected vendingMachineMoney: Coin;
  protected userInputMoney: number;

  constructor() {
    this.products = [];
    this.userInputMoney = 0;
    this.userMoney = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.vendingMachineMoney = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
  }

  getProducts() {
    return this.products;
  }

  getUserMoney() {
    return this.userMoney;
  }

  getUserInputMoney() {
    return this.userInputMoney;
  }

  getVendingMachineMoney() {
    return this.vendingMachineMoney;
  }

  setUserMoney = (money: number) => {
    this.userInputMoney = money;
  };

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
    CoinModel.makeChangesToCoin(money, this.vendingMachineMoney);

    return ALERT_MESSAGE.ADD_CHARGE_SUCCESS(money);
  }

  inputUserMoney(money: number) {
    this.checkInputMoneyValidate(money);
    this.userInputMoney += money;
    return ALERT_MESSAGE.INPUT_MONEY_SUCCESS(money);
  }

  purchaseProduct(productName: string) {
    const productIndex = this.findProductIndex(productName);
    const productPrice = this.products[productIndex].price;
    const productAmount = this.products[productIndex].amount;

    if (this.userInputMoney < productPrice) {
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
    }

    if (productAmount < 1) {
      throw new Error(ERROR_MESSAGE.NOT_ENOUGH_AMOUNT);
    }

    this.userInputMoney -= productPrice;
    this.products[productIndex].amount -= 1;

    return ALERT_MESSAGE.PURCHASE_PRODUCT_SUCCESS(productName);
  }

  returnChanges() {
    return CoinModel.returnChanges(this.userInputMoney, this.setUserMoney, this.userMoney, this.vendingMachineMoney);
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

    if (CoinModel.getCoinsValue(this.vendingMachineMoney) + money > RULES.MAX_VENDING_MACHINE_CHANGE) {
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

<<<<<<< HEAD
    if (this.userInputMoney + money > RULES.MAX_VENDING_MACHINE_INPUT_MONEY) {
      throw new Error(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_INPUT_MONEY);
    }
  }
=======
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
>>>>>>> 59bf0111a48ba352d7e652e94949ec58bf554d7c
}

const vendingMachine = new VendingMachine();

export default vendingMachine;
