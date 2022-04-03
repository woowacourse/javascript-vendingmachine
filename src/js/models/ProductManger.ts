import { validProductInfo } from '../utils/validation.js';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductManageInterface {
  addProduct: (product: Product) => void;
  getProducts: () => Product[];
  modifyProduct: (index: number, product: Product) => void;
  deleteProduct: (index: number) => void;
}

export default class ProductManagerModel implements ProductManageInterface {
  #products: Product[];

  constructor() {
    this.#products = [];
  }

  addProduct(product: Product): void {
    validProductInfo(product, this.#products);
    this.#products.push(product);
  }

  getProducts(): Product[] {
    return this.#products;
  }

  modifyProduct(index: number, product: Product): void {
    const productsList = [...this.#products];
    productsList.splice(index, 1);
    validProductInfo(product, productsList);
    this.#products.splice(index, 1, product);
  }

  deleteProduct(index: number): void {
    this.#products.splice(index, 1);
  }
}
