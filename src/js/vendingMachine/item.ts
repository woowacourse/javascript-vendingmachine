import { ItemType } from '../types/types';

export default class Item implements ItemType {
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _id: number;

  constructor({ name, price, quantity, id }: ItemType) {
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._id = id;
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

  get id() {
    return this._id;
  }

  subtractQuantity() {
    this._quantity -= 1;
  }
}
