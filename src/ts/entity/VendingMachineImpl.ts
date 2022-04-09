import { VendingMachine, Coin, Product, ProductName } from '../../index.d';
import { generateRandomInRange } from '../util';

export default class VendingMachineImpl implements VendingMachine {
  public products: Array<Product>;
  public coins: Array<Coin>;
  private static instance: VendingMachine;

  static getInstance() {
    if (!this.instance) {
      this.instance = new VendingMachineImpl();
    }

    return this.instance;
  }

  constructor() {
    this.initialize();
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  modifyProduct(product: Product, originProductName: ProductName): void {
    this.products[this.getProductIndex(originProductName)] = product;
  } 

  deleteProduct(name: ProductName): void {
    this.products.splice(this.getProductIndex(name), 1);
  }

  getProductIndex(name: ProductName): number {
    return this.products.findIndex((product: Product) => (product.name as unknown as ProductName) === name);
  }

  generateCoins(inputMoney: number): void {
    while (inputMoney > 0) {
      const pickLength = this.coins.filter(({ amount }) => inputMoney >= amount).length - 1;
      const coinIndex = generateRandomInRange(0, pickLength);

      this.coins[coinIndex].count += 1;
      inputMoney -= this.coins[coinIndex].amount;
    }
  }

  calculateTotalAmount(): number {
    return this.coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
  }

  initialize() {
    this.products = [];
    this.coins = [
      { amount: 10, count: 0 },
      { amount: 50, count: 0 },
      { amount: 100, count: 0 },
      { amount: 500, count: 0 },
    ];
  }
}
