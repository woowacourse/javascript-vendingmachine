import ProductType from '../type/ProductType';
import MoneyType from '../type/MoneyType';
import Product from './Product';
import Money from './Money';
import { checkDuplicatedProduct, checkRechargeMoney } from './validator';
import { getRandomNumber } from '../utils';
import { STORAGE_ID, COIN } from '../constants';
import PurchaseMoney from './PurchaseMoney';
import { PurchaseMoneyInterface } from './PurchaseMoney';

export interface VendingMachineInterface {
  products: ProductType[];
  money: MoneyType[];
  purchaseMoney: PurchaseMoneyInterface;

  getPurchaseMoneyFromStorage(key: string): PurchaseMoneyInterface;
  getProductsFromStorage(key: string): ProductType[];
  getMoneyFromStorage(key: string): MoneyType[];
  getCoin(value: number): MoneyType;
  getHoldingMoney(): number;
  getProduct(name: string): ProductType;
  generateRandomCoins(money: number): void;
  rechargeMoney(money: number): void;
  addProduct(product: ProductType): ProductType;
  deleteProduct(name: string): void;
  editProduct(name: string, product: ProductType): void;
  addPurchaseMoney(money: number): number;
}

export default class VendingMachine implements VendingMachineInterface {
  products: ProductType[];
  money: MoneyType[];
  purchaseMoney: PurchaseMoneyInterface;

  constructor() {
    this.products = this.getProductsFromStorage(STORAGE_ID.PRODUCTS) || [];
    this.money = this.getMoneyFromStorage(STORAGE_ID.MONEY) || [
      new Money(COIN.VALUE_500, 0),
      new Money(COIN.VALUE_100, 0),
      new Money(COIN.VALUE_50, 0),
      new Money(COIN.VALUE_10, 0),
    ];
    this.purchaseMoney =
      this.getPurchaseMoneyFromStorage(STORAGE_ID.PURCHASE_MONEY) || new PurchaseMoney(0);
  }

  getPurchaseMoneyFromStorage = (key: string): PurchaseMoneyInterface => {
    const purchaseMoneyFromStorage = JSON.parse(localStorage.getItem(key));

    return new PurchaseMoney(purchaseMoneyFromStorage ? purchaseMoneyFromStorage.purchaseMoney : 0);
  };

  getProductsFromStorage = (key: string): ProductType[] => {
    const productsFromStorage = JSON.parse(localStorage.getItem(key));

    return productsFromStorage?.map(
      ({ name, price, quantity }) => new Product({ name, price, quantity }),
    );
  };

  getMoneyFromStorage = (key: string): MoneyType[] => {
    const moneyFromStorage = JSON.parse(localStorage.getItem(key));

    return moneyFromStorage?.map(({ value, count }) => new Money(value, count));
  };

  getCoin = (value: number) => {
    return this.money.find((coin) => coin.value === value);
  };

  getHoldingMoney = () => {
    return this.money.reduce((holdingMoney: number, currentMoney: MoneyType) => {
      return holdingMoney + currentMoney.value * currentMoney.count;
    }, 0);
  };

  getProduct = (name: string) => {
    return this.products.find((product) => product.name === name);
  };

  generateRandomCoins = (money: number) => {
    while (money !== 0) {
      const coinValue = this.money[getRandomNumber(0, 3)].value;
      if (coinValue <= money) {
        const index = this.money.findIndex((coin: MoneyType) => coin.value === coinValue);
        this.money[index].count += 1;
        money -= coinValue;
      }
    }
  };

  rechargeMoney = (money: number) => {
    checkRechargeMoney(money, money + this.getHoldingMoney());
    this.generateRandomCoins(money);

    localStorage.setItem(STORAGE_ID.MONEY, JSON.stringify(this.money));
  };

  addProduct = (product: ProductType) => {
    const productToAdd = new Product(product);
    checkDuplicatedProduct(this.products, productToAdd.name);
    this.products.push(productToAdd);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));

    return productToAdd;
  };

  deleteProduct = (name: string) => {
    const indexToDelete = this.products.findIndex((product) => product.name === name);

    this.products.splice(indexToDelete, 1);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
  };

  editProduct = (targetName: string, product: ProductType) => {
    const indexToEdit = this.products.findIndex((product) => product.name === targetName);
    const editedProduct = new Product(product);
    if (editedProduct.name !== targetName) {
      checkDuplicatedProduct(this.products, product.name);
    }
    this.products[indexToEdit] = editedProduct;

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
  };

  addPurchaseMoney = (money: number): number => {
    return this.purchaseMoney.increaseMoney(money);
  };
}
