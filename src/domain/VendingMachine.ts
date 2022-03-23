import CustomElement from '../ui/CustomElement';
import { on, $ } from '../utils';
import { validateProduct } from '../validator';
import Coin from './Coin';
import Product from './Product';

interface IVendingMachine {
  amount: Coin;
  products: Product[];
}

class VendingMachine implements IVendingMachine {
  static _instance = null;

  static get instance() {
    if (!VendingMachine._instance) {
      VendingMachine._instance = new VendingMachine();
    }
    return VendingMachine._instance;
  }

  amount: Coin;
  products: Product[];
  observers: { key: string; element: CustomElement }[] = [];

  constructor() {
    this.amount = new Coin();
    this.products = [];
    this.subscribeEvents();
  }

  subscribeEvents() {
    on('.product-manage-form', '@add', (e) => this.addProduct(e.detail), $('product-management'));
  }

  dispatch(key: string) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify(this.amount, this.products));
  }

  observe(key: string, element: CustomElement) {
    this.observers.push({ key, element });
  }

  addProduct(product: Product) {
    try {
      validateProduct(product, this.products);
      this.products.push(new Product(product));
      this.dispatch('product');
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
