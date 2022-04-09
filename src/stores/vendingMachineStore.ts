import CoinWallet from '../domains/coinWallet';
import {
  IVendingMachineStore,
  TVendingMachineState,
  TVendingMachineStateComponents,
  TVendingMachineStateKey,
} from './types';

class VendingMachineStore implements IVendingMachineStore {
  subscribedComponents: TVendingMachineStateComponents;

  state: TVendingMachineState;

  constructor() {
    this.subscribedComponents = {
      PRODUCT_LIST: [],
      COIN_WALLET: [],
      INPUT_CHARGE: [],
      RETURN_COIN: [],
    };
    this.state = {
      PRODUCT_LIST: [],
      COIN_WALLET: new CoinWallet(),
      INPUT_CHARGE: 0,
      RETURN_COIN: new CoinWallet(),
    };
  }

  subscribe(stateType: TVendingMachineStateKey, component: unknown) {
    this.subscribedComponents[stateType].push(component);
  }

  setState(key, valueOrFunction) {
    if (typeof valueOrFunction === 'function') {
      this.state[key] = valueOrFunction(this.state[key]);
    }
    if (typeof valueOrFunction !== 'function') {
      this.state[key] = valueOrFunction;
    }
    this.notifySubscribedView(key);
  }

  getState(stateType: TVendingMachineStateKey) {
    return this.state[stateType];
  }

  notifySubscribedView(stateType: TVendingMachineStateKey) {
    this.subscribedComponents[stateType].forEach(component => component.wakeUp());
  }
}

export default new VendingMachineStore();
