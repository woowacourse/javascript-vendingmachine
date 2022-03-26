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
    const productIndex = this.findExistingProductIndex(name);

    if (productIndex !== -1) {
      this.accumulateQuantity(productIndex, quantity);

      return;
    }

    this.productList = [...this.productList, new Product(name, price, quantity)];
  }

  findExistingProductIndex(name: string): number {
    return this.productList.findIndex((product) => product.getName() === name);
  }

  private accumulateQuantity(productIndex: number, quantity: number) {
    const targetProduct = this.productList[productIndex];

    try {
      targetProduct.validateQuantity(targetProduct.getQuantity() + quantity);
      targetProduct.setQuantity(targetProduct.getQuantity() + quantity);
    } catch (err) {
      throw err;
    }
  }

  deleteProduct(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }
}
