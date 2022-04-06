import ProductType from '../type/ProductType';
import Product, { ProductInterface } from './Product';
import Money, { MoneyInterface } from './Money';
import { checkDuplicatedProduct, checkRechargeMoney } from './validator';
import { getRandomNumber } from '../utils';
import { STORAGE_ID, COIN, ERROR_MESSAGE } from '../constants';
import PurchaseMoney from './PurchaseMoney';
import { PurchaseMoneyInterface } from './PurchaseMoney';

export interface VendingMachineInterface {
  products: ProductInterface[];
  money: MoneyInterface[];
  purchaseMoney: PurchaseMoneyInterface;

  getPurchaseMoneyFromStorage(key: string): PurchaseMoneyInterface;
  getProductsFromStorage(key: string): ProductInterface[];
  getMoneyFromStorage(key: string): MoneyInterface[];
  getCoin(value: number): MoneyInterface;
  getHoldingMoney(): number;
  getProduct(name: string): ProductInterface;
  generateRandomCoins(money: number): void;
  rechargeMoney(money: number): void;
  addProduct(product: ProductType): ProductInterface;
  deleteProduct(name: string): void;
  editProduct(name: string, product: ProductType): ProductInterface;
  addPurchaseMoney(money: number): number;
  purchaseProduct(name: string): void;
  returnCoins(): number[];
}

export default class VendingMachine implements VendingMachineInterface {
  products: ProductInterface[];
  money: MoneyInterface[];
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

    return new PurchaseMoney(purchaseMoneyFromStorage ? purchaseMoneyFromStorage.money : 0);
  };

  getProductsFromStorage = (key: string): ProductInterface[] => {
    const productsFromStorage = JSON.parse(localStorage.getItem(key));

    return productsFromStorage?.map(
      ({ name, price, quantity }) => new Product({ name, price, quantity }),
    );
  };

  getMoneyFromStorage = (key: string): MoneyInterface[] => {
    const moneyFromStorage = JSON.parse(localStorage.getItem(key));

    return moneyFromStorage?.map(({ value, count }) => new Money(value, count));
  };

  getCoin = (value: number) => {
    return this.money.find((coin) => coin.value === value);
  };

  getHoldingMoney = () => {
    return this.money.reduce((holdingMoney: number, currentMoney: MoneyInterface) => {
      return holdingMoney + currentMoney.value * currentMoney.count;
    }, 0);
  };

  getProduct = (name: string) => {
    return this.products.find((product) => product.getName() === name);
  };

  generateRandomCoins = (money: number) => {
    while (money !== 0) {
      const coinValue = this.money[getRandomNumber(0, 3)].value;
      if (coinValue <= money) {
        const index = this.money.findIndex((coin: MoneyInterface) => coin.value === coinValue);
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
    checkDuplicatedProduct(this.products, productToAdd.getName());
    this.products.push(productToAdd);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));

    return productToAdd;
  };

  deleteProduct = (name: string) => {
    const indexToDelete = this.products.findIndex((product) => product.getName() === name);

    this.products.splice(indexToDelete, 1);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
  };

  editProduct = (targetName: string, product: ProductType) => {
    const indexToEdit = this.products.findIndex((product) => product.name === targetName);
    const editedProduct = new Product(product);
    if (editedProduct.getName() !== targetName) {
      checkDuplicatedProduct(this.products, product.name);
    }
    this.products[indexToEdit] = editedProduct;

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
    return this.products[indexToEdit];
  };

  addPurchaseMoney = (money: number): number => {
    const increasedMoney = this.purchaseMoney.increaseMoney(money);

    localStorage.setItem(STORAGE_ID.PURCHASE_MONEY, JSON.stringify(this.purchaseMoney));

    return increasedMoney;
  };

  purchaseProduct = (name: string) => {
    const productToPurchase = this.getProduct(name);

    if (this.purchaseMoney.money - productToPurchase.getPrice() >= 0) {
      productToPurchase.decreaseQuantity();
      this.purchaseMoney.decreaseMoney(productToPurchase.getPrice());

      if (productToPurchase.getQuantity() === 0) {
        this.deleteProduct(productToPurchase.getName());
      }
      localStorage.setItem(STORAGE_ID.PURCHASE_MONEY, JSON.stringify(this.purchaseMoney));
      localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
      return;
    }
    throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
  };

  returnCoins = () => {
    let currentMoney = this.purchaseMoney.getMoney();
    const decreasedCounts = [];

    this.money.forEach((money) => {
      const share = Math.floor(currentMoney / money.value);
      const decreasedCount = money.decreaseCount(share);
      decreasedCounts.push(decreasedCount);
      currentMoney -= decreasedCount * money.getValue();
    });
    this.purchaseMoney.money = currentMoney;

    localStorage.setItem(STORAGE_ID.PURCHASE_MONEY, JSON.stringify(this.purchaseMoney));
    localStorage.setItem(STORAGE_ID.MONEY, JSON.stringify(this.money));

    return decreasedCounts;
  };
}
