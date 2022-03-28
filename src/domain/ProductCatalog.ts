import { Product } from './Product';

export class ProductCatalog {
  private productList: Product[];

  constructor() {
    this.productList = [];
  }

  getProductList() {
    return this.productList;
  }

  addProduct(name: string, price: number, quantity: number) {
    const product = this.findProduct(name);

    if (product) {
      this.accumulateQuantity(product, quantity);

      return;
    }

    this.productList = [...this.productList, new Product(name, price, quantity)];
  }

  findProduct(name: string): Product {
    return this.productList.find((product) => product.getName() === name);
  }

  private accumulateQuantity(product: Product, quantity: number) {
    try {
      product.validateQuantity(product.getQuantity() + quantity);
      product.setQuantity(product.getQuantity() + quantity);
    } catch (err) {
      throw err;
    }
  }

  deleteProduct(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }
}
