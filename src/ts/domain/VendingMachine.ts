import ProductType from '../type/ProductType';
import MoneyType from '../type/MoneyType';
import Product from './Product';
import Money from './Money';
import {
  checkDuplicatedProduct,
  checkInsertedMoneyValidation,
  checkMoneyValidation,
} from './validator';
import { getRandomNumber } from '../utils';
import { STORAGE_ID } from '../constants';

export interface VendingMachineInterface {
  products: ProductType[];
  moneys: MoneyType[];
  insertedMoney: number;
  addProduct(product: ProductType): ProductType;
  deleteProduct(name: string): void;
  getProduct(name: string): ProductType;
  editProduct(name: string, product: ProductType): void;
  rechargeMoney(money: number): void;
  getHoldingMoney(): number;
  getCoin(value: number): MoneyType;
  addInsertedMoney(money: number): number;
}

export default class VendingMachine implements VendingMachineInterface {
  private _products: ProductType[];
  private _moneys: MoneyType[];
  private _insertedMoney: number;

  constructor() {
    this._products = this.getProductsFromStorage(STORAGE_ID.PRODUCTS) || [];
    this._moneys = this.getMoneyFromStorage(STORAGE_ID.MONEY) || [
      new Money(500, 0),
      new Money(100, 0),
      new Money(50, 0),
      new Money(10, 0),
    ];
    this._insertedMoney = 0;
  }

  public get products(): ProductType[] {
    return this._products;
  }

  public get moneys(): MoneyType[] {
    return this.moneys;
  }

  public get insertedMoney(): number {
    return this._insertedMoney;
  }

  public resetProducts = () => {
    this._products = [];
  };

  public resetMoneys = () => {
    this._moneys = [new Money(500, 0), new Money(100, 0), new Money(50, 0), new Money(10, 0)];
  };

  public resetInsertedMoney = () => {
    this._insertedMoney = 0;
  }

  public rechargeMoney = (money: number) => {
    checkMoneyValidation(money, money + this.getHoldingMoney());
    this.generateRandomCoins(money);

    localStorage.setItem(STORAGE_ID.MONEY, JSON.stringify(this._moneys));
  };

  public getHoldingMoney = () => {
    return this._moneys.reduce((holdingMoney: number, currentMoney: MoneyType) => {
      return holdingMoney + currentMoney.value * currentMoney.count;
    }, 0);
  };

  public getCoin = (value: number) => {
    return this._moneys.find((coin) => coin.value === value);
  };

  public getProduct = (name: string) => {
    return this._products.find((product) => product.name === name);
  };

  public addProduct = (newProduct: ProductType) => {
    const productToAdd = new Product(newProduct);
    checkDuplicatedProduct(this._products, productToAdd.name);
    this._products.push(productToAdd);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this._products));

    return productToAdd;
  };

  public deleteProduct = (name: string) => {
    this._products = this._products.filter((product) => product.name !== name);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this._products));
  };

  public editProduct = (name: string, product: ProductType) => {
    const indexToEdit = this._products.findIndex((product) => product.name === name);

    if (this._products[indexToEdit].name !== product.name) {
      checkDuplicatedProduct(this._products, product.name);
    }
    this._products[indexToEdit].setProduct(product);

    localStorage.setItem(STORAGE_ID.PRODUCTS, JSON.stringify(this._products));
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
      const moneyRandomIndex = getRandomNumber(0, 3);
      const coinValue = this._moneys[moneyRandomIndex].value;
      if (coinValue <= money) {
        this._moneys[moneyRandomIndex].increaseCount();
        money -= coinValue;
      }
    }
  };

  public addInsertedMoney = (money: number) => {
    checkInsertedMoneyValidation(money, this._insertedMoney);
    this._insertedMoney = <number>this._insertedMoney + money;

    return this._insertedMoney;
  };
}
