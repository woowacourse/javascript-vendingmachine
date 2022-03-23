import { ERROR_MESSAGE, RULES } from '../constants';
import { Product, Coin } from '../interfaces/VendingMachine.interface';
import { isValidProductPrice, isValidProductAmount, isValidProductNameLength } from './validator';

class VendingMachine {
  private products: Array<Product>; // name amount price
  changes: Coin; // 자판기가 보유하고 있는 돈 = 잔돈
  totalMoney: number;

  constructor() {
    this.products = [];
    this.changes = { coin10: 0, coin50: 0, coin100: 0, coin500: 0 };
    this.totalMoney = 0;
  }

  getProducts() {
    return this.products;
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

  inputChanges(money: number) {
    // 1. 돈이 10원으로 나누어지는지 -> 어디에 로직을 둘것인지 킵

    if (money > RULES.MAX_VENDING_MACHINE_CHANGE) {
      throw new Error(ERROR_MESSAGE.TOO_MUCH_VENDING_MACHINE_CHANGE);
    }

    this.totalMoney += money;

    const coin = this.getChangeCoin(money);

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
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max + 1); // 0 ~ max
  }

  getChangeCoin(money: number) {
    const coins = [500, 100, 50, 10].filter(coin => coin <= money);
    const index = this.getRandomInt(coins.length - 1);
    return coins[index];
  }

  checkProductValidate(product: Product, originalIndex: number = -1) {
    const productIndex = this.findProductIndex(product.name);
    const isExist = productIndex >= 0;
    const isAddWithDuplicatedName = isExist && originalIndex === -1;
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
