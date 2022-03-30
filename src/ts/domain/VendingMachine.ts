import ProductType from '../type/ProductType';
import MoneyType from '../type/MoneyType';
import Product from './Product';
import Money from './Money';
import { checkDuplicatedProduct, checkMoneyValidation } from './validator';
import { getRandomNumber } from '../utils';
import { STORAGE_ID } from '../constants';

export interface VendingMachineInterface {
  products: ProductType[];
  moneys: MoneyType[];
  addProduct(product: ProductType): ProductType;
  deleteProduct(name: string): void;
  getProduct(name: string): ProductType;
  editProduct(name: string, product: ProductType): void;
  rechargeMoney(money: number): void;
  getHoldingMoney(): number;
  getCoin(value: number): MoneyType;
}

export default class VendingMachine implements VendingMachineInterface {
  products: ProductType[];
  moneys: MoneyType[];

  constructor() {
    this.products = this.getProductsFromStorage(STORAGE_ID.PRODUCTS) || [];
    this.moneys = this.getMoneyFromStorage(STORAGE_ID.MONEY) || [
      new Money(500, 0),
      new Money(100, 0),
      new Money(50, 0),
      new Money(10, 0),
    ];
  }

  public rechargeMoney = (money: number) => {
    checkMoneyValidation(money, money + this.getHoldingMoney());
    this.generateRandomCoins(money);

    localStorage.setItem(STORAGE_ID.MONEY, JSON.stringify(this.moneys));
  };

  public getHoldingMoney = () => {
    return this.moneys.reduce((holdingMoney: number, currentMoney: MoneyType) => {
      return holdingMoney + currentMoney.value * currentMoney.count;
    }, 0);
  };

  public getCoin = (value: number) => {
    return this.moneys.find((coin) => coin.value === value);
  };

  public getProduct = (name: string) => {
    return this.products.find((product) => product.name === name);
  };

  public addProduct = (newProduct: ProductType) => {
    const productToAdd = new Product(newProduct);
    checkDuplicatedProduct(this.products, productToAdd.name);
    this.products.push(productToAdd);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));

    return productToAdd;
  };

  public deleteProduct = (name: string) => {
    this.products = this.products.filter((product) => product.name !== name);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
  };

  public editProduct = (name: string, product: ProductType) => {
    const indexToEdit = this.products.findIndex((product) => product.name === name);

    if (this.products[indexToEdit].name !== product.name) {
      checkDuplicatedProduct(this.products, product.name);
    }
    this.products[indexToEdit].setProduct(product);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this.products));
  };

  private getProductsFromStorage = (key: string) => {
    const copy = JSON.parse(localStorage.getItem(key));

    return copy?.map((product) => {
      const productToCopy = {
        name: product._name,
        price: product._price,
        quantity: product._quantity,
      };

      return new Product(productToCopy);
    });
  };

  private getMoneyFromStorage = (key: string) => {
    const copy = JSON.parse(localStorage.getItem(key));

    return copy?.map((money) => new Money(money._value, money._count));
  };

  private generateRandomCoins = (money: number) => {
    while (money !== 0) {
      const coinValue = this.moneys[getRandomNumber(0, 3)].value;
      if (coinValue <= money) {
        const index = this.moneys.findIndex((coin: MoneyType) => coin.value === coinValue);
        this.moneys[index].increaseCount();
        money -= coinValue;
      }
    }
  };
}
