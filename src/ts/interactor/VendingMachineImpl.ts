import { VendingMachine, ProductCollection, CoinCollection, Product, ProductName } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
import ProductCollectionImpl from '../entity/ProductCollectionImpl';
import CoinCollectionImpl from '../entity/CoinCollectionImpl';
import validator from './validator';

export default class VendingMachineImpl implements VendingMachine {
  public readonly productCollection: ProductCollection;
  public readonly coinCollection: CoinCollection;
  public totalUserInputMoney: number;
  private static instance: VendingMachine;

  static getInstance() {
    if (!this.instance) {
      this.instance = new VendingMachineImpl();
    }

    return this.instance;
  }

  constructor() {
    this.productCollection = new ProductCollectionImpl();
    this.coinCollection = new CoinCollectionImpl();
    this.totalUserInputMoney = 0;
  }

  addProduct(product: Product): void {
    validator.checkAdditionalProduct(product, this.productCollection.products);
    this.productCollection.add(product);
  }

  modifyProduct(product: Product, originProductName: ProductName): void {
    validator.checkModifiedProduct(product, this.productCollection.products, this.productCollection.getIndex(originProductName));
    this.productCollection.modify(product, originProductName);
  }

  deleteProduct(name: ProductName): void {
    if (this.productCollection.getIndex(name) === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);
    this.productCollection.delete(name);
  }

  chargeMoney(inputMoney: number): void {
    validator.checkChargeMoney(inputMoney, this.coinCollection.calculateTotalAmount());
    this.coinCollection.generateCoins(inputMoney);
  }

  chargeUserMoney(userInputMoney: number): void {
    validator.checkChargeUserMoney(userInputMoney, this.totalUserInputMoney);
    this.totalUserInputMoney += userInputMoney;
  }

  buyProduct(name: ProductName): void {
    const productIndex = this.productCollection.getIndex(name);

    if (productIndex === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);

    const product = this.productCollection.products[productIndex];

    if (product.price > this.totalUserInputMoney) throw new Error(ERROR_MESSAGE.LOCK_OF_USER_INPUT_MONEY);

    product.quantity -= 1;
    this.totalUserInputMoney -= product.price;

    if (product.quantity === 0) this.productCollection.delete(product.name as unknown as ProductName);
  }

  returnChangeCoins(): Object {
    return this.coinCollection.coins
      .reverse()
      .reduce((acc, { amount, count }) => {
        const coinCount = Math.min(Math.floor(this.totalUserInputMoney / amount), count);

        this.totalUserInputMoney -= coinCount * amount;
        acc[amount] = coinCount;

        return acc;
      }, {});
  }
}
