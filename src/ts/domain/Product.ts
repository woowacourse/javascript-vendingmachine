import { ProductInfo } from './types';

interface Product {
  editProduct: (newProduct: ProductInfo) => void;
}

export default class ProductImpl implements Product {
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
