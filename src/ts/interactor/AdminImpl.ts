import { VendingMachine, Admin, Product, ProductName } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../entity/VendingMachineImpl';
import validator from './validator';

export default class AdminImpl implements Admin {
  public readonly vendingMachine: VendingMachine;
  private static instance: Admin;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AdminImpl();
    }

    return this.instance;
  }

  constructor() {
    this.vendingMachine = VendingMachineImpl.getInstance();
  }

  addProduct(product: Product): void {
    validator.checkAdditionalProduct(product, this.vendingMachine.products);
    this.vendingMachine.addProduct(product);
  }

  modifyProduct(product: Product, originProductName: ProductName): void {
    validator.checkModifiedProduct(product, this.vendingMachine.products, this.vendingMachine.getProductIndex(originProductName));
    this.vendingMachine.modifyProduct(product, originProductName);
  }

  deleteProduct(name: ProductName): void {
    if (this.vendingMachine.getProductIndex(name) === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);
    this.vendingMachine.deleteProduct(name);
  }

  chargeMoney(inputMoney: number): void {
    validator.checkChargeMoney(inputMoney, this.vendingMachine.calculateTotalAmount());
    this.vendingMachine.generateCoins(inputMoney);
  }
}
