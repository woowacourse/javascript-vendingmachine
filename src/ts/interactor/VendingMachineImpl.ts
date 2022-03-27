import { VendingMachine, ProductCollection, CoinCollection, Product } from '../../index.d';
import ProductCollectionImpl from '../entity/ProductCollectionImpl';
import CoinCollectionImpl from '../entity/CoinCollectionImpl';

export default class VendingMachineImpl implements VendingMachine {
  public readonly productCollection: ProductCollection;
  public readonly coinCollection: CoinCollection;

  constructor() {
    this.productCollection = new ProductCollectionImpl();
    this.coinCollection = new CoinCollectionImpl();
  }

  addProduct(product: Product): void {
    
  }

  modifyProduct(product: Product): void {
    
  }

  deleteProduct(name: string): void {
    
  }
}
