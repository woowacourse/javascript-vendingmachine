import { VendingMachine, ProductCollection, CoinCollection, Product } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
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
    if (this.productCollection.getIndex(name) === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);
    this.productCollection.delete(name);
  }

  chargeMoney(inputMoney: number): void {
    validator.checkChargeMoney(inputMoney, this.coinCollection.calculateTotalAmount());
    this.coinCollection.generateCoins(inputMoney);
  }
}
