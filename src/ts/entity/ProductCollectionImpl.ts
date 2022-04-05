import { ProductCollection, Product, ProductName } from '../../index.d';

export default class ProductCollectionImpl implements ProductCollection {
  public readonly products: Array<Product>;

  constructor() {
    this.products = [];
  }

  add(product: Product): void {
    this.products.push(product);
  }

  modify(product: Product, originProductName: ProductName): void {
    this.products[this.getIndex(originProductName)] = product;
  } 

  delete(name: ProductName): void {
    this.products.splice(this.getIndex(name), 1);
  }

  getIndex(name: ProductName): number {
    return this.products.findIndex((product: Product) => (product.name as unknown as ProductName) === name);
  }
}
