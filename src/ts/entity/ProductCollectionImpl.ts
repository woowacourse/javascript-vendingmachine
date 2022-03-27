import { ProductCollection, Product } from '../../index.d';

export default class ProductCollectionImpl implements ProductCollection {
  public readonly products: Array<Product>;

  constructor() {
    this.products = [];
  }

  add(product: Product) {
    this.products.push(product);
  }

  modify(product: Product) {
    this.products[this.getIndex(product.name)] = product;
  } 

  delete(name: string) {
    this.products.splice(this.getIndex(name), 1);
  }

  getIndex(name: string) {
    return this.products.findIndex((product) => product.name === name);
  }
}
