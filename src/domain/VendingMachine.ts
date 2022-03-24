import storage from '../storage';
import CustomElement from '../ui/CustomElement';
import { on, $ } from '../utils';
import { validateChange, validateProduct, validateUpdateProduct } from '../validator';
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
    this.amount = storage.getLocalStorage('amount')
      ? new Coin(
          storage.getLocalStorage('amount')[500],
          storage.getLocalStorage('amount')[100],
          storage.getLocalStorage('amount')[50],
          storage.getLocalStorage('amount')[10],
        )
      : new Coin(0, 0, 0, 0);
    this.products = storage.getLocalStorage('products')
      ? storage.getLocalStorage('products').map((product: Product) => {
          return new Product(product);
        })
      : [];
  }

  subscribeProductManagement() {
    on('.product-manage-form', '@add', (e) => this.addProduct(e.detail), $('product-management'));
    on(
      '#product-list-table',
      '@edit',
      (e) => this.updateProduct(e.detail.targetName, e.detail.name, e.detail.price, e.detail.quantity),
      $('product-management'),
    );
    on('#product-list-table', '@delete', (e) => this.deleteProduct(e.detail.productName), $('product-management'));
  }

  subscribeChargeTab() {
    on('.charge-form', '@charge', (e) => this.charge(e.detail.change), $('charge-tab'));
  }

  dispatch(key: string, action: string, product?: Product) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify(action, this.amount, product));
  }

  observe(key: string, element: CustomElement) {
    this.observers.push({ key, element });
    this[key]();
  }

  addProduct(product: Product) {
    try {
      validateProduct(product, this.products);
      const newProduct = new Product(product);
      this.products.push(newProduct);
      storage.setLocalStorage('products', this.products);
      this.dispatch('subscribeProductManagement', 'add', newProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  updateProduct(targetName: string, name: string, price: number, quantity: number) {
    try {
      console.log(targetName, name, price, quantity, this.products);
      validateUpdateProduct(targetName, name, price, this.products);
      ($(`[data-product-name="${targetName}"]`) as HTMLElement).dataset.productName = name;
      const target = this.products.find((product) => product.name === targetName);
      console.log(target);
      target.update({ name, price, quantity } as Product);
      storage.setLocalStorage('products', this.products);
      this.dispatch('subscribeProductManagement', 'update', target);
    } catch (error) {
      // console.log(error);
      alert(error.message);
    }
  }

  deleteProduct(name: string) {
    this.dispatch(
      'subscribeProductManagement',
      'delete',
      this.products.find((product) => product.name === name),
    );
    this.products = this.products.filter((product) => product.name !== name);
    storage.setLocalStorage('products', this.products);
  }

  charge(inputMoney: number) {
    try {
      validateChange(inputMoney, this.amount.getAmount());
      this.amount.genarateRandomCoin(inputMoney);
      storage.setLocalStorage('amount', this.amount);
      this.dispatch('subscribeChargeTab', 'update');
    } catch (error) {
      alert(error.message);
    }
  }
}

export default VendingMachine;
