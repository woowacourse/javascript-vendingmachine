export default class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  getList() {
    return this.products;
  }
}
