import * as type from "../interface/vendingMachine.interface";

import {
  checkDuplicatedName,
  checkNameLength,
  checkValidPrice,
  checkValidCount,
  checkDividedByMinimumCoin,
  checkMoneyOverMaximum,
  checkMoneyUnderZero,
} from "../util/validations";

import SingleProduct from "./product";

export default class VendingMachine implements type.IVendingMachine {
  private static instance: VendingMachine;

  private chargedMoney = 0;
  private products = [];
  private changes = {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  addProduct: type.IAddProduct = ({ name, price, count }) => {
    checkDuplicatedName(this.products, name);
    checkNameLength(name);
    checkValidPrice(price);
    checkValidCount(count);

    const product = new SingleProduct(name, price, count);
    this.products.push(product);
    return product;
  };

  getProducts: type.IGetProducts = () => {
    return this.products;
  };

  updateProduct: type.IUpdateProduct = (id, name, price, count) => {
    checkDuplicatedName(this.products, name, id);
    checkNameLength(name);
    checkValidPrice(price);
    checkValidCount(count);

    const product = this.products.find((product) => id === product.getId());

    product.updateName(name);
    product.updatePrice(price);
    product.updateCount(count);

    return product;
  };

  deleteProduct: type.IDeleteProduct = (id) => {
    this.products = this.products.filter((product) => product.getId() !== id);
  };

  chargeChanges: type.IChargeChanges = (money) => {
    checkDividedByMinimumCoin(money);
    checkMoneyOverMaximum(this.getTotalChanges() + money);
    checkMoneyUnderZero(money);

    const newCoins = this.generateCoins(money);
    this.accumulateCoins(newCoins);
  };

  accumulateCoins = (newCoins: type.TCoin) => {
    this.changes = Object.entries(newCoins).reduce((acc, [coin, count]) => {
      return { ...acc, [coin]: this.changes[coin] + count };
    }, this.changes);
  };

  generateCoins: type.IGenerateCoins = (money) => {
    const coinArray = [500, 100, 50, 10];
    const newCoins = { 500: 0, 100: 0, 50: 0, 10: 0 };

    while (money) {
      const idx = Math.floor(Math.random() * coinArray.length);
      if (money < coinArray[idx]) continue;
      newCoins[coinArray[idx]] += 1;
      money -= coinArray[idx];
    }

    return newCoins;
  };

  getCoins: type.IGetCoins = () => {
    return this.changes;
  };

  getTotalChanges: type.IGetTotalChanges = () => {
    return Object.entries(this.changes).reduce((acc, [coin, count]) => {
      return acc + Number(coin) * count;
    }, 0);
  };

  getChargedMoney() {
    return this.chargedMoney;
  }

  getPurchaseableProducts() {
    return this.products.filter(
      (product) => product.get().price <= this.chargedMoney
    );
  }

  chargeMoney: type.IChargeMoney = (money) => {
    this.chargedMoney += money;
  };

  purchaseProduct: type.IPurchaseProduct = (id) => {
    const idx = this.products.findIndex((product) => product.getId() === id);
    const { price, count } = this.products[idx].get();

    this.chargedMoney -= price;
    this.products[idx].updateCount(count - 1);
  };

  returnChanges: type.IReturnChanges = () => {
    let index = 0;
    const list = [500, 100, 50, 10];
    const userChanges = { 500: 0, 100: 0, 50: 0, 10: 0 };
    while (this.chargedMoney > 0 && this.getTotalChanges() > 0 && index < 4) {
      if (this.changes[list[index]] === 0) index++;
      if (list[index] > this.chargedMoney) index++;
      if (index === 4) return userChanges;
      this.chargedMoney -= list[index];
      this.changes[list[index]]--;
      userChanges[list[index]]++;
    }

    return userChanges;
  };
}
