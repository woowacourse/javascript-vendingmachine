import { on, $ } from '../utils';
import { validateProduct } from '../validator';
import Coin from './Coin';
import Product from './Product';

interface IVendingMachine {
  amount: Coin;
  products: Product[];
}

class VendingMachine implements IVendingMachine {
  amount: Coin;
  products: Product[];

  constructor() {
    this.amount = new Coin();
    this.products = [];
    this.subscribeEvents();
  }

  subscribeEvents() {
    on('.product-manage-form', '@add', (e) => this.addProduct(e.detail), $('product-management'));
  }

  addProduct(product: Product) {
    try {
      validateProduct(product, this.products);
      this.products.push(new Product(product));
    } catch (error) {
      alert(error.message);
    }
  }

  updateProduct(targetName: string, product: Product) {
    const target = this.products.find((product) => product.name === targetName);

    target.update(product);
  }

  deleteProduct(name: string) {
    this.products = this.products.filter((product) => product.name !== name);
  }

  charge(inputMoney: number) {
    this.amount.randomGenarate(inputMoney);
  }
}

export default VendingMachine;
