import { validProductInfo } from '../utils/validation.js';

import { Product, ProductManageInterface } from '../interface/productManage.interface';

export default class ProductManager implements ProductManageInterface {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  addProduct(product: Product) {
    validProductInfo(product, this.products);
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  modifyProduct(index, product) {
    const productsList = [...this.products];
    productsList.splice(index, 1);
    validProductInfo(product, productsList);
    this.products.splice(index, 1, product);
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
  }
}
