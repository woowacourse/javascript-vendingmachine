import { ProductInfo } from './types';

export default class Product {
  #product: ProductInfo;

  constructor(product: ProductInfo) {
    this.#product = product;
  }

  get name() {
    return this.#product.name;
  }

  get product() {
    return this.#product;
  }

  editProduct(newProduct: ProductInfo) {
    this.#product = newProduct;
  }
}
