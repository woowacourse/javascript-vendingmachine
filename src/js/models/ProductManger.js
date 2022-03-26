import { validProductInfo } from '../utils/validation.js';

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    try {
      validProductInfo(product);
      this.products.push(product);
    } catch (error) {
      alert(error.message);
    }
  }

  getProducts() {
    return this.products;
  }

  modifyProduct(index, product) {
    this.products.splice(index, 1, product);
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
  }
}
