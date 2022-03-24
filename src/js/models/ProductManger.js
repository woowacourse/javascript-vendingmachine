import { validProductPriceUnit } from '../utils/validation.js';

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    try {
      validProductPriceUnit(product.price);
      this.products.push(product);
    } catch (error) {
      alert(error.message);
    }
  }

  getList() {
    return this.products;
  }
}
