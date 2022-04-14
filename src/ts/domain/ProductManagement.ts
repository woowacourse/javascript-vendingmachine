import ProductImpl from './Product';
import type { ProductInfo } from './types';

export default class ProductManagement {
  #products: ProductImpl[];

  constructor() {
    this.#products = [];
  }

  get products() {
    return this.#products;
  }

  addProduct(newProduct: ProductInfo) {
    this.#products.push(new ProductImpl(newProduct));
  }

  deleteProduct(productName: string) {
    this.#products = this.#products.filter(
      product => product.name !== productName,
    );
  }

  editProduct(prevProductName: string, newProduct: ProductInfo) {
    this.#products.forEach(product => {
      if (product.name === prevProductName) {
        product.editProduct(newProduct);
      }
    });
  }

  buyProduct(productName) {
    this.#products.forEach(product => {
      if (product.name !== productName) return;
      product.buyProduct();

      if (product.quantity === 0) {
        this.deleteProduct(productName);
      }
    });
  }
}
