import CoinWallet from '../domains/coinWallet';
import Product from '../domains/product';
import { ERROR_MSG, ACTION_TYPES } from '../utils/constants';
import { IVendingMachineStore, TAction, TState, TStateKey, TSubscribedComponents } from './types';

class VendingMachineStore implements IVendingMachineStore {
  subscribedComponents: TSubscribedComponents;

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

      /** 무언가.. 객체를 직접 변경하는 것 같죠..? 얕은 복사를 수행한 배열 데이터를 조작하여 그 배열 데이터를 set 해주어야 할 것 같은데 */
      this.state.PRODUCT_LIST.push(product);

      /** 아래 방법으로 수행하는 것과 위 방법으로 수행하는 것 - 둘은 어떤 문제를 막고 어떤 문제를 발생시킬 수 있나요.? */
      // this.state.PRODUCT_LIST = [...this.state.PRODUCT_LIST,product];
    },
    [ACTION_TYPES.EDIT_PRODUCT]: payload => {
      const { id, name, price, quantity } = payload;

      /** 무언가.. 객체를 직접 변경하는 것 같죠..? 얕은 복사를 수행한 배열 데이터를 조작하여 그 배열 데이터를 set 해주어야 할 것 같은데 */
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
  };
}

export default new VendingMachineStore();
