import ProductType from '../type/ProductType';
import { checkProductValidation } from './validator';

export default class Product implements ProductType {
  name: string;
  price: number;
  quantity: number;

  constructor({ name, price, quantity }: ProductType) {
    checkProductValidation({ name, price, quantity });
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
