import ProductType from '../type/ProductType';
import MoneyType from '../type/MoneyType';
import Product from './Product';
import Money from './Money';
import { checkDuplicatedProduct, checkMoneyValidation } from './validator';
import { getRandomNumber } from '../utils';
import { STORAGE_ID } from '../constants';

export interface VendingMachineInterface {
  products: ProductType[];
  money: MoneyType[];
  addProduct(input: ProductType): ProductType;
  deleteProduct(name: string): void;
  getProductByName(name: string): ProductType;
  editProduct(name: string, product: ProductType): void;
  rechargeMoney(money: number): void;
  getHoldingMoney(): number;
  generateRandomCoins(money: number): void;
  getCoinByValue(value: number): MoneyType;
  getProductsFromStorage(key: string): ProductType;
  getMoneyFromStorage(key: string): MoneyType[];
}

export default class VendingMachine implements VendingMachineInterface {
  products: ProductType[];
  money: MoneyType[];

  constructor() {
    this.products = this.getProductsFromStorage(STORAGE_ID.PRODUCTS) || [];
    this.money = this.getMoneyFromStorage(STORAGE_ID.MONEY) || [
      new Money(500, 0),
      new Money(100, 0),
      new Money(50, 0),
      new Money(10, 0),
    ];
  }

  getProductsFromStorage = (key: string) => {
    const copy = JSON.parse(localStorage.getItem(key));

    return copy?.map((product) => {
      const productToCopy = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      };

      return new Product(productToCopy);
    });
  };

  getMoneyFromStorage = (key: string) => {
    const copy = JSON.parse(localStorage.getItem(key));

    return copy?.map((money) => new Money(money.value, money.count));
  };

  getCoinByValue = (value: number) => {
    return this.money.find((coin) => coin.value === value);
  };

  getHoldingMoney = () => {
    return this.money.reduce((holdingMoney: number, currentMoney: MoneyType) => {
      return holdingMoney + currentMoney.value * currentMoney.count;
    }, 0);
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
    checkMoneyValidation(money, money + this.getHoldingMoney());
    this.generateRandomCoins(money);

    localStorage.setItem(STORAGE_ID.MONEY, JSON.stringify(this.money));
  };

  addProduct = (newProduct: ProductType) => {
    const productToAdd = new Product(newProduct);
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

  getProductByName = (name: string) => {
    return this.products.find((product) => product.name === name);
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
}
