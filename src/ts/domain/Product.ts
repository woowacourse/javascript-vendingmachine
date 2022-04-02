import type { ProductInfo } from './types';

export default class ProductImpl {
  #product: ProductInfo;

  constructor(product: ProductInfo) {
    this.#product = product;
  }

  get name() {
    return this.#product.name;
  }

  get price() {
    return this.#product.price;
  }

  get quantity() {
    return this.#product.quantity;
  }

  get product() {
    return this.#product;
  }

  editProduct(newProduct: ProductInfo) {
    this.#product = newProduct;
  }

  buyProduct() {
    this.#product = { ...this.#product, quantity: this.#product.quantity - 1 };
  }
}
