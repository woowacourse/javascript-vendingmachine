import { ProductInfo } from './types';

interface Product {
  editProduct: (newProduct: ProductInfo) => void;
  getProduct: () => ProductInfo;
}

export default class ProductImpl implements Product {
  #name: string;
  #price: number;
  #quantity: number;

  constructor({ name, price, quantity }: ProductInfo) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  get name() {
    return this.#name;
  }

  editProduct(newProduct: ProductInfo) {
    const { name, price, quantity } = newProduct;
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  getProduct() {
    return { name: this.#name, price: this.#price, quantity: this.#quantity };
  }
}
