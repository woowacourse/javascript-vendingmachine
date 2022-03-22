import { Product } from './Product';

export class ProductCatalog {
  productList: Product[];

  constructor() {
    this.productList = [];
  }

  addProduct(name: string, price: number, quantity: number) {
    this.productList = [...this.productList, new Product(name, price, quantity)];
  }

  deleteProductByName(name: string) {
    this.productList = this.productList.filter((product) => product.getName() !== name);
  }
}
