import { ERROR_MSG } from '../constants';
import CoinWallet from '../domains/coinWallet';
import Product from '../domains/product';
import { VENDING_MACHINE_STATE_KEYS } from '../utils/constants';
import { IVendingMachineStore, TState, TSubsrcribedComponents } from './types';

class VendingMachineStore implements IVendingMachineStore {
  subscribedComponents: TSubsrcribedComponents;

  state: TState;
  constructor() {
    this.subscribedComponents = {
      PRODUCT_LIST: [],
      COIN_WALLET: [],
      INPUT_CHARGE: [],
    };
    this.state = {
      PRODUCT_LIST: [],
      COIN_WALLET: new CoinWallet(),
      INPUT_CHARGE: 0,
    };
  }
  mutateProductList(actionType, payload) {
    if (actionType === 'addProduct') {
      const { name, price, quantity } = payload;

      const product = new Product(name, price, quantity);

      this.state.PRODUCT_LIST.push(product);
    }
    if (actionType === 'editProduct') {
      const { id, name, price, quantity } = payload;

      const editProduct = this.state.PRODUCT_LIST.find(
        product => product.getProductInfo().id === id,
      );
      editProduct.editProductInfo({ name, price, quantity });
    }
    if (actionType === 'deleteProduct') {
      const { id } = payload;

      const deletedProductList = this.state.PRODUCT_LIST.filter(product => {
        const { id: productId } = product.getProductInfo();
        return productId !== id;
      });
      this.state.PRODUCT_LIST = deletedProductList;
    }
    this.notifySubscribedView(VENDING_MACHINE_STATE_KEYS.PRODUCT_LIST);
  }
  mutateCoinWallet() {}
  mutateInputCharge() {}
  subscribe(stateType, component) {
    this.subscribedComponents[stateType].push(component);
  }
  getState(stateType, component) {
    if (this.subscribedComponents[stateType].includes(component)) {
      return this.state[stateType];
    }
    throw new Error(ERROR_MSG.CAN_NOT_REFERENCE_STATE);
  }
  notifySubscribedView(stateType) {
    this.subscribedComponents[stateType].forEach(component => component.wakeUp());
  }
}

export default new VendingMachineStore();
