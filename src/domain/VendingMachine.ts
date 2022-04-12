import { ELEMENT_KEY } from '../constants';
import storage from '../storage';
import CustomElement from '../ui/CustomElement';
import { on, $, showSnackBar } from '../utils';
import Coin from './Coin';
import { Product, IProduct } from './Product';
import MoneyInput from './MoneyInput';
import Change from './Change';
import { validateReturnCharge } from '../validator/returnChangeValidator';
import { validatePurchaseProduct } from '../validator/purchaseProductValidator';
import { validateInputMoney } from '../validator/userInputMoneyValidator';
import { validateChange } from '../validator/changeValidator';
import { validateUpdateProduct } from '../validator/updateProductValidator';
import { validateProduct } from '../validator/productValidator';

class VendingMachine {
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
      this.dispatch(ELEMENT_KEY.PURCHASE, 'add', newProduct);
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  updateProduct({ targetProductName, name, price, quantity }) {
    try {
      validateUpdateProduct(targetProductName, name, price, this.products);
      const currentProduct = this.products.find((product) => product.name === targetProductName);

      currentProduct.update({ name, price, quantity } as IProduct);
      storage.setLocalStorage('products', this.products);

      this.dispatch(ELEMENT_KEY.PRODUCT, 'update', currentProduct);
      this.dispatch(ELEMENT_KEY.PURCHASE, 'update', currentProduct);
    } catch (error) {
      showSnackBar(error.message);
    }
  }

  deleteProduct(targetProductName: string) {
    const targetProduct = this.products.find((product) => product.name === targetProductName);

    this.dispatch(ELEMENT_KEY.PRODUCT, 'delete', targetProduct);
    this.dispatch(ELEMENT_KEY.PURCHASE, 'delete', targetProduct);
    this.products = this.products.filter((product) => product.name !== targetProductName);
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

  purchaseProduct(targetProductName: string) {
    try {
      validatePurchaseProduct(targetProductName, this.products, this.moneyInput.getAmount());

      const targetProduct = this.products.find((product) => product.name === targetProductName);
      targetProduct.purchase();
      this.moneyInput.subtractMoney(targetProduct.price);

      if (targetProduct.quantity === 0) {
        this.products = this.products.filter((product) => product.name !== targetProductName);
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
      const chargedCoin = this.amount;
      validateReturnCharge(chargedCoin);

      const userInputMoney = this.moneyInput;
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
