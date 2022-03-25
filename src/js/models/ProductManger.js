export default class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
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
