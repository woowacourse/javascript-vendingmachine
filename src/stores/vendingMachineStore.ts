import CoinWallet from '../domains/coinWallet';
import Product from '../domains/product';
import {
  ERROR_MSG,
  ACTION_TYPES,
  COIN_VALUES,
  VENDING_MACHINE_STATE_KEYS,
} from '../utils/constants';
import { IVendingMachineStore, TAction, TState, TStateKey, TSubscribedComponents } from './types';

class VendingMachineStore implements IVendingMachineStore {
  subscribedComponents: TSubscribedComponents;

  state: TState;

  constructor() {
    this.subscribedComponents = {
      PRODUCT_LIST: [],
      COIN_WALLET: [],
      INPUT_CHARGE: [],
      RETURN_COIN_WALLET: [],
    };
    this.state = {
      PRODUCT_LIST: [],
      COIN_WALLET: new CoinWallet(),
      INPUT_CHARGE: 0,
      RETURN_COIN_WALLET: {
        coin500: 0,
        coin100: 0,
        coin50: 0,
        coin10: 0,
      },
    };
  }

  mutateState({
    actionType,
    payload,
    stateKey,
  }: {
    actionType: TAction;
    payload: unknown;
    stateKey: TStateKey;
  }) {
    this.reducer[actionType](payload);
    this.notifySubscribedView(stateKey);
  }

  subscribe(stateType: TStateKey, component: unknown) {
    this.subscribedComponents[stateType].push(component);
  }

  getState(stateType: TStateKey, component: unknown) {
    if (this.subscribedComponents[stateType].includes(component)) {
      return this.state[stateType];
    }
    throw new Error(ERROR_MSG.CAN_NOT_REFERENCE_STATE);
  }

  notifySubscribedView(stateType: TStateKey) {
    this.subscribedComponents[stateType].forEach(component => component.wakeUp());
  }

  reducer = {
    [ACTION_TYPES.ADD_PRODUCT]: payload => {
      const { name, price, quantity } = payload;

      const product = new Product(name, price, quantity);

      this.state.PRODUCT_LIST.push(product);
    },
    [ACTION_TYPES.EDIT_PRODUCT]: payload => {
      const { id, name, price, quantity } = payload;

      const editProduct = this.state.PRODUCT_LIST.find(
        product => product.getProductInfo().id === id,
      );
      editProduct.editProductInfo({ name, price, quantity });
    },
    [ACTION_TYPES.DELETE_PRODUCT]: payload => {
      const { id } = payload;

      const deletedProductList = this.state.PRODUCT_LIST.filter(product => {
        const { id: productId } = product.getProductInfo();
        return productId !== id;
      });
      this.state.PRODUCT_LIST = deletedProductList;
    },
    [ACTION_TYPES.RECHARGE_CHANGE]: payload => {
      const { changeInput } = payload;

      this.state.COIN_WALLET.rechargeCoinWallet(changeInput);
    },
    [ACTION_TYPES.INSERT_CHARGE]: payload => {
      const { inputCharge } = payload;
      const totalInputCharge = this.state.INPUT_CHARGE + inputCharge;

      this.state.INPUT_CHARGE = totalInputCharge;
    },
    [ACTION_TYPES.PURCHASE_PRODUCT]: payload => {
      const { id, productPrice } = payload;

      const purchaseProduct = this.state.PRODUCT_LIST.find(
        product => product.getProductInfo().id === id,
      );

      purchaseProduct.purchaseProduct();

      this.state.INPUT_CHARGE -= productPrice;
    },
    [ACTION_TYPES.RETURN_COIN_WALLET]: payload => {
      const inputCharge = this.state.INPUT_CHARGE;
      const returnCoinWallet = this.state.COIN_WALLET.returnChangeCoinInfo(inputCharge);

      const returnCoinWalletTotal = Object.keys(returnCoinWallet).reduce(
        (prev, key) => prev + returnCoinWallet[key] * COIN_VALUES[key],
        0,
      );
      this.state.RETURN_COIN_WALLET = returnCoinWallet;
      this.state.INPUT_CHARGE -= returnCoinWalletTotal;

      this.notifySubscribedView(VENDING_MACHINE_STATE_KEYS.INPUT_CHARGE);
    },
  };
}

export default new VendingMachineStore();
