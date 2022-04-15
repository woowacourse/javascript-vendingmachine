import ProductType from '../type/ProductType';
import { checkProductValidation } from './validator';

export interface ProductInterface extends ProductType {
  getName(): string;
  getPrice(): number;
  getQuantity(): number;

  decreaseQuantity(): void;
}

export default class Product implements ProductInterface {
  name: string;
  price: number;
  quantity: number;

  constructor({ name, price, quantity }: ProductType) {
    checkProductValidation({ name, price, quantity });
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getName = () => this.name;

  getPrice = () => this.price;

  getQuantity = () => this.quantity;

  decreaseQuantity = () => {
    this.quantity -= 1;
  };
}
