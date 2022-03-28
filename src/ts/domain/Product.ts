import ProductType from '../type/ProductType';
import { checkProductValidation } from './validator';

interface ProductInterface extends ProductType {}

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

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get quantity() {
    return this._quantity;
  }
}
