import { ELEMENT_KEY } from '../constants';
import storage from '../storage';
import CustomElement from '../ui/CustomElement';
import { on, $ } from '../utils';
import { productValidator, changeValidator, updateProductValidator } from '../validator';
import { ERROR_MESSAGE } from '../constants';
import Coin from './Coin';
import { Product } from './Product';

interface IVendingMachine {
  amount: Coin;
  products: Product[];
}

class VendingMachine implements IVendingMachine {
  static _instance: VendingMachine | null = null;

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
    this.amount = new Coin(...storage.getAmount());
    this.products = storage.getProducts().map((product) => new Product(product, product.id));
  }

  subscribeProductManagement() {
    on('.product-manage-form', '@add', (e) => this.addProduct(e.detail), $('product-management'));
    on('#product-list-table', '@update', (e) => this.updateProduct(e.detail), $('product-management'));
    on('#product-list-table', '@delete', (e) => this.deleteProduct(e.detail.productName), $('product-management'));
  }

  subscribeChargeTab() {
    on('.charge-form', '@charge', (e) => this.charge(e.detail.change), $('charge-tab'));
  }

  subscribePurchaseTab() {}

  dispatch(key: string, action: string, product?: Product) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify(action, this.amount, product));
  }

  observe(key: string, element: CustomElement) {
    this.observers.push({ key, element });
    this[key]();
  }

  validateProduct(product: Product, products: Product[]) {
    if (productValidator.isDuplicated(product.name, products)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
    }

    if (productValidator.isIncorrectUnit(product.price)) {
      throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
    }
  }

  validateUpdateProduct(targetName: string, name: string, price: number, products: Product[]) {
    if (updateProductValidator.isDuplicated(targetName, name, products)) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
    }

    if (updateProductValidator.isIncorrectUnit(price)) {
      throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_PRODUCT_PRICE);
    }
  }

  validateChange(inputMoney: number, currentChange: number) {
    if (changeValidator.isOverMax(inputMoney, currentChange)) {
      throw new Error(ERROR_MESSAGE.OVER_AMOUNT);
    }

    if (changeValidator.isIncorrectUnit(inputMoney)) {
      throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
    }
  }

  addProduct(product: Product) {
    try {
      this.validateProduct(product, this.products);
      const newProduct = new Product(product);

      this.products.push(newProduct);
      storage.setLocalStorage('products', this.products);
      this.dispatch(ELEMENT_KEY.PRODUCT, 'add', newProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  updateProduct({ targetName, name, price, quantity }) {
    try {
      this.validateUpdateProduct(targetName, name, price, this.products);
      const currentProduct = this.products.find((product) => product.name === targetName);

      currentProduct.update({ name, price, quantity } as Product);
      storage.setLocalStorage('products', this.products);
      this.dispatch(ELEMENT_KEY.PRODUCT, 'update', currentProduct);
    } catch (error) {
      alert(error.message);
    }
  }

  deleteProduct(targetName: string) {
    const targetProduct = this.products.find((product) => product.name === targetName);

    this.dispatch(ELEMENT_KEY.PRODUCT, 'delete', targetProduct);
    this.products = this.products.filter((product) => product.name !== targetName);
    storage.setLocalStorage('products', this.products);
  }

  charge(inputMoney: number) {
    try {
      this.validateChange(inputMoney, this.amount.getAmount());

      this.amount.generateRandomCoin(inputMoney);
      storage.setLocalStorage('amount', this.amount);
      this.dispatch(ELEMENT_KEY.CHARGE, 'update');
    } catch (error) {
      alert(error.message);
    }
  }
}

export default VendingMachine;
