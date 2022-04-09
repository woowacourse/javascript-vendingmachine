import { VendingMachine, Buyer, Coin, ProductName } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../entity/VendingMachineImpl';
import validator from './validator';

export default class BuyerImpl implements Buyer {
  public readonly vendingMachine: VendingMachine;
  public totalInputMoney: number;

  constructor() {
    this.vendingMachine = VendingMachineImpl.getInstance();
    this.totalInputMoney = 0;
  }

  chargeMoney(userInputMoney: number): void {
    validator.checkChargeUserMoney(userInputMoney, this.totalInputMoney);
    this.totalInputMoney += userInputMoney;
  }

  buyProduct(name: ProductName): void {
    const productIndex = this.vendingMachine.getProductIndex(name);

    if (productIndex === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);

    const product = this.vendingMachine.products[productIndex];

    if (product.price > this.totalInputMoney) throw new Error(ERROR_MESSAGE.LOCK_OF_USER_INPUT_MONEY);

    product.quantity -= 1;
    this.totalInputMoney -= product.price;

    if (product.quantity === 0) this.vendingMachine.deleteProduct(product.name as unknown as ProductName);
  }

  receiveChangeCoins(): Object {
    return [...this.vendingMachine.coins]
      .reverse()
      .reduce((acc, coin: Coin) => {
        const coinCount = Math.min(Math.floor(this.totalInputMoney / coin.amount), coin.count);

        this.totalInputMoney -= coinCount * coin.amount;
        coin.count -= coinCount;
        acc[coin.amount] = coinCount;

        return acc;
      }, {});
  }
}
