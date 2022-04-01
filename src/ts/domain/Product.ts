import ProductType from '../type/ProductType';
import { checkProductValidation } from './validator';

interface ProductInterface extends ProductType {
  setProduct?({ name, price, quantity }: ProductType): void;
}

export default class Product implements ProductInterface {
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor({ name, price, quantity }: ProductType) {
    checkProductValidation({ name, price, quantity });
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._quantity;
  }

  setProduct({ name, price, quantity }: ProductType) {
    checkProductValidation({ name, price, quantity });
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  public set name(name) {
    this._name = name;
  }

  public set price(price) {
    this._price = price;
  }

  public set quantity(quantity) {
    this._quantity = quantity;
  }
}
