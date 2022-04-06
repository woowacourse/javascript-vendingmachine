import { ELEMENT_KEY } from '../constants';
import storage from '../storage';
import { CustomElement } from '../ui/CustomElement';
import { on, $, showSnackbar } from '../utils';
import {
  validateChange,
  validateProduct,
  validatePurchable,
  validateReturn,
  validateUpdateProduct,
  validateUserInputMoney,
} from '../validator';
import { Safe } from './Safe';
import Product from './Product';

interface VendingMachineProperty {
  amount: Safe;
  userAmount: number;
  products: Product[];
}

class VendingMachine implements VendingMachineProperty {
  static _instance: VendingMachine | null = null;

  static get instance() {
    if (!VendingMachine._instance) {
      VendingMachine._instance = new VendingMachine();
    }
    return VendingMachine._instance;
  }

  amount: Safe;
  userAmount = 0;
  products: Product[];
  observers: { key: string; element: CustomElement }[] = [];

  constructor() {
    this.amount = new Safe(storage.getLocalStorage('amount'));
    this.products = storage.getLocalStorage('products').map((product) => new Product(product, product.id));
  }

  subscribeProductManagement() {
    on('.product-manage-form', '@add', (e: CustomEvent) => this.addProduct(e.detail), $('product-management'));
    on('#product-list-table', '@update', (e: CustomEvent) => this.updateProduct(e.detail), $('product-management'));
    on(
      '#product-list-table',
      '@delete',
      (e: CustomEvent) => this.deleteProduct(e.detail.productName),
      $('product-management'),
    );
  }

  subscribeChargeTab() {
    on('.charge-form', '@charge', (e) => this.charge(e.detail.change), $('charge-tab'));
  }

  subscribePurchaseTab() {
    on(
      '.user-amount-form',
      '@insert-coin',
      (e: CustomEvent) => this.insertCoin(e.detail.userInputMoney),
      $('purchase-tab'),
    );
    on(
      '#purchasable-product-list-table',
      '@purchase',
      (e: CustomEvent) => this.purchase(e.detail.productId),
      $('purchase-tab'),
    );
    on('.return-button', '@return', () => this.returnCoin(), $('purchase-tab'));
  }

  dispatch(key: string, action: string, product?: Product) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) =>
      target.element.notify({ action, amount: this.amount, product, userAmount: this.userAmount }),
    );
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
      this.dispatch('subscribePurchaseTab', 'update-product', newProduct);
      this.dispatch(ELEMENT_KEY.PRODUCT, 'add', newProduct);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  updateProduct({ targetName, name, price, quantity }) {
    try {
      validateUpdateProduct(targetName, name, price, this.products);
      const target = this.products.find((product) => product.name === targetName);

      target.update({ name, price, quantity } as Product);
      storage.setLocalStorage('products', this.products);
      this.dispatch('subscribePurchaseTab', 'update-product', target);
      this.dispatch(ELEMENT_KEY.PRODUCT, 'update', target);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  deleteProduct(targetName: string) {
    const targetProduct = this.products.find((product) => product.name === targetName);

    this.dispatch('subscribePurchaseTab', 'delete-product', targetProduct);
    this.dispatch(ELEMENT_KEY.PRODUCT, 'delete', targetProduct);
    this.products = this.products.filter((product) => product.name !== targetName);
    storage.setLocalStorage('products', this.products);
  }

  charge(inputMoney: number) {
    try {
      validateChange(inputMoney, this.amount.getAmount());

      this.amount.genarateRandomCoin(inputMoney);
      storage.setLocalStorage('amount', this.amount.counter);
      this.dispatch(ELEMENT_KEY.CHARGE, 'update');
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  insertCoin(userInputMoney: number) {
    try {
      validateUserInputMoney(userInputMoney, this.userAmount);

      this.userAmount += userInputMoney;
      this.dispatch('subscribePurchaseTab', 'insert-coin');
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  purchase(productId: string) {
    const targetProduct = this.products.find((product) => product.id === productId);

    try {
      validatePurchable(this.userAmount, targetProduct);

      this.userAmount -= targetProduct.price;
      targetProduct.quantity -= 1;
      this.dispatch('subscribePurchaseTab', 'purchase', targetProduct);

      if (targetProduct.quantity <= 0) {
        this.products = this.products.filter((product) => product.id !== targetProduct.id);
      }

      storage.setLocalStorage('products', this.products);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  returnCoin() {
    try {
      validateReturn(this.userAmount);

      const remainingUserAmount = this.amount.returnChange(this.userAmount);

      this.userAmount = remainingUserAmount;
      this.dispatch('subscribePurchaseTab', 'return');
      this.dispatch(ELEMENT_KEY.CHARGE, 'update');
      storage.setLocalStorage('amount', this.amount.counter);
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}

export default VendingMachine;
