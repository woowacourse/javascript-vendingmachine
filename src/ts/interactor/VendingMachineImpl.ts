import { VendingMachine, ProductCollection, CoinCollection, Product } from '../../index.d';
import ProductCollectionImpl from '../entity/ProductCollectionImpl';
import CoinCollectionImpl from '../entity/CoinCollectionImpl';
import validator from './validator';

export default class VendingMachineImpl implements VendingMachine {
  public readonly productCollection: ProductCollection;
  public readonly coinCollection: CoinCollection;

  constructor() {
    this.productCollection = new ProductCollectionImpl();
    this.coinCollection = new CoinCollectionImpl();
  }

  addProduct(product: Product): void {
    validator.checkAdditionalProduct(product, this.productCollection.products);
    this.productCollection.add(product);
  }

  modifyProduct(product: Product, originProductName: string): void {
    validator.checkModifiedProduct(product, this.productCollection.products, this.productCollection.getIndex(originProductName));
    this.productCollection.modify(product, originProductName);
  }

  deleteProduct(name: string): void {
    
  }
}
