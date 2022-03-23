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
    on(
      '#product-list-table',
      '@edit',
      (e) => this.updateProduct(e.detail.targetName, e.detail.name, e.detail.price, e.detail.quantity),
      $('product-management'),
    );
    on('#product-list-table', '@delete', (e) => this.deleteProduct(e.detail.productName), $('product-management'));
  }

  dispatch(key: string, action: string, product?: Product) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify(action, this.amount, product));
  }

  observe(key: string, element: CustomElement) {
    this.observers.push({ key, element });
  }

  addProduct(product: Product) {
    try {
      validateProduct(product, this.products);
      const newProduct = new Product(product);
      this.products.push(newProduct);
      this.dispatch('product', 'add', newProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  updateProduct(targetName: string, name: string, price: number, quantity: number) {
    const target = this.products.find((product) => product.name === targetName);

    target.update(name, price, quantity);

    this.dispatch('product', 'update', target);
  }

  deleteProduct(name: string) {
    this.dispatch(
      'product',
      'delete',
      this.products.find((product) => product.name === name),
    );
    this.products = this.products.filter((product) => product.name !== name);
  }

  charge(inputMoney: number) {
    this.amount.randomGenarate(inputMoney);
  }
}

export default VendingMachine;
