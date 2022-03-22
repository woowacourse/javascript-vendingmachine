import { Product } from './Product';

export class ProductCatalog {
  productList: Product[];

  constructor() {
    this.productList = [];
  }

  addProduct(name: string, price: number, quantity: number) {
    this.productList.push(new Product(name, price, quantity));
  }
}
