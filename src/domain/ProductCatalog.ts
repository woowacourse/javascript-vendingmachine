import { ERROR_MESSAGE } from '../utils/constants';
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

    if (this.isSameProductExist(product, price)) {
      this.accumulateQuantity(product, quantity);

      return;
    }

    this.productList = [...this.productList, new Product(name, price, quantity)];
  }

  isSameProductExist(product: Product, price: number): boolean {
    if (!product) return false;
    if (product.getPrice() !== price)
      throw Error(ERROR_MESSAGE.SAME_PRODUCT_NAME_NOT_SAME_PRODUCT_PRICE);

    return true;
  }

  findProduct(name: string): Product {
    return this.productList.find((product) => product.getName() === name);
  }

  private accumulateQuantity(product: Product, quantity: number) {
    product.validateQuantity(product.getQuantity() + quantity);
    product.setQuantity(product.getQuantity() + quantity);
  }

  deleteProduct(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }
}
