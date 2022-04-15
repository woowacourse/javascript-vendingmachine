import { Product } from './Product';
import { validateProductQuantity } from './Product.validateFuncs';

export class ProductCatalog {
  productList: Product[];

  constructor() {
    this.productList = [];
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

  accumulateQuantity(productIndex: number, quantity: number) {
    const target = this.productList[productIndex];
    try {
      validateProductQuantity(target.getQuantity() + quantity);
      target.setQuantity(target.getQuantity() + quantity);
    } catch (err) {
      throw err;
    }
  }

  deleteProductByName(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }

  purchaseProductByName(name: string) {
    const productIndex = this.findExistingProductIndex(name);
    const target = this.productList[productIndex];
    try {
      validateProductQuantity(target.getQuantity() - 1);
      target.setQuantity(target.getQuantity() - 1);
    } catch (err) {
      throw err;
    }
  }

  getProductQuantityByName(name: string): number {
    const productIndex = this.findExistingProductIndex(name);
    const target = this.productList[productIndex];
    return target.getQuantity();
  }

  getProductPriceByName(name: string): number {
    const productIndex = this.findExistingProductIndex(name);
    const target = this.productList[productIndex];
    return target.getPrice();
  }
}
