import { ELEMENT_KEY } from '../constants';
import storage from '../storage';
import CustomElement from '../ui/CustomElement';
import { on, $, showSnackBar } from '../utils';
import {
  validateProduct,
  validateChange,
  validateUpdateProduct,
  validateInputMoney,
  validatePurchaseProduct,
} from '../validator';
import Coin from './Coin';
import { Product } from './Product';
import MoneyInput from './MoneyInput';
import Change from './Change';

interface IVendingMachine {
  amount: Coin;
  products: Product[];
  moneyInput: MoneyInput;
  change: Change;
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
  moneyInput: MoneyInput;
  change: Change;
  observers: { key: string; element: CustomElement }[] = [];

  constructor() {
    this.amount = new Coin(...storage.getAmount());
    this.products = storage.getProducts().map((product) => new Product(product, product.id));
    this.moneyInput = new MoneyInput(storage.getUserMoney());
  }

  subscribeProductManagement() {
    on('.product-manage-form', '@add', (e) => this.addProduct(e.detail), $('product-management'));
    on('#product-list-table', '@update', (e) => this.updateProduct(e.detail), $('product-management'));
    on('#product-list-table', '@delete', (e) => this.deleteProduct(e.detail.productName), $('product-management'));
  }

  subscribeChargeTab() {
    on('.charge-form', '@charge', (e) => this.charge(e.detail.change), $('charge-tab'));
  }

  subscribePurchaseTab() {
    on('.purchase-form', '@input', (e) => this.inputMoney(e.detail), $('purchase-tab'));
    on('#purchase-product-list-table', '@purchase', (e) => this.purchaseProduct(e.detail), $('purchase-tab'));
    on('.purchase-return-button', '@return', (e) => this.returnChange(), $('purchase-tab'));
  }

  dispatch(key: string, action: string, data?: Product | number | Coin | Object) {
    const targets = this.observers.filter((observer) => observer.key === key);

    const amount = this.amount;
    targets.forEach((target) => target.element.notify({ action, amount, data }));
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
      this.dispatch(ELEMENT_KEY.PRODUCT, 'add', newProduct);
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  updateProduct({ targetName, name, price, quantity }) {
    try {
      validateUpdateProduct(targetName, name, price, this.products);
      const currentProduct = this.products.find((product) => product.name === targetName);

      currentProduct.update({ name, price, quantity } as Product);
      storage.setLocalStorage('products', this.products);
      this.dispatch(ELEMENT_KEY.PRODUCT, 'update', currentProduct);
    } catch (error) {
      showSnackBar(error.message);
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
      validateChange(inputMoney, this.amount.getAmount());

      this.amount.generateRandomCoin(inputMoney);
      storage.setLocalStorage('amount', this.amount);
      this.dispatch(ELEMENT_KEY.CHARGE, 'update', this.amount);
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  inputMoney(money: number) {
    try {
      validateInputMoney(money, this.moneyInput.getAmount());

      this.moneyInput.addMoney(money);
      const userMoney = this.moneyInput.getAmount();
      storage.setLocalStorage('userMoney', userMoney);
      this.dispatch(ELEMENT_KEY.PURCHASE, 'input', userMoney);
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  purchaseProduct(targetName: string) {
    try {
      validatePurchaseProduct(targetName, this.products, this.moneyInput.getAmount());

      const targetProduct = this.products.find((product) => product.name === targetName);
      targetProduct.purchase();
      this.moneyInput.subtractMoney(targetProduct.price);

      if (targetProduct.quantity === 0) {
        this.products = this.products.filter((product) => product.name !== targetName);
      }

      const userMoney = this.moneyInput.getAmount();
      storage.setLocalStorage('products', this.products);
      storage.setLocalStorage('userMoney', userMoney);

      const { id, quantity } = targetProduct;
      this.dispatch(ELEMENT_KEY.PURCHASE, 'purchase', { id, quantity, userMoney });
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  returnChange() {
    try {
      const userInputMoney = this.moneyInput;
      const chargedCoin = this.amount;
      const change = new Change();

      change.calculateReturnChange({ userInputMoney, chargedCoin, change });
      const userMoney = userInputMoney.getAmount();
      storage.setLocalStorage('userMoney', userMoney);
      storage.setLocalStorage('amount', chargedCoin);

      this.dispatch(ELEMENT_KEY.PURCHASE, 'return', { userMoney, change, chargedCoin });
    } catch (error) {
      showSnackBar(error.message);
    }
  }
}

export default VendingMachine;
