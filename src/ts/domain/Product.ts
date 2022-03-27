import { ProductInfo } from './types';

interface ProductProps {
  editProduct: (newProduct: ProductInfo) => void;
}

export default class Product implements ProductProps {
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
