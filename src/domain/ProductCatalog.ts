import { Product } from './Product';

export class ProductCatalog {
  productList: Product[];

  constructor() {
    this.productList = [];
  }

  addProduct(name: string, price: number, quantity: number) {
    const productIndex = this.findExistingProductIndex(name);

    if (productIndex !== -1) {
      const target = this.productList[productIndex];
      try {
        target.validateQuantity(target.getQuantity() + quantity);
        target.setQuantity(target.getQuantity() + quantity);
      } catch (err) {
        throw err;
      }
      return;
    }

    this.productList = [...this.productList, new Product(name, price, quantity)];
  }

  findExistingProductIndex(name: string): number {
    return this.productList.findIndex((product) => product.getName() === name);
  }

  deleteProductByName(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }
}
