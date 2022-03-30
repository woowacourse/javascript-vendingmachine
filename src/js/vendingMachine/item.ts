import { ItemType } from '../types/types';

export default class Item implements ItemType {
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(name: string, price: number, quantity: number) {
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
