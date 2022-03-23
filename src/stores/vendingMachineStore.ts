import { ERROR_MSG } from '../constants';
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
  }
  mutateProductList() {}
  mutateCoinWallet() {}
  mutateInputCharge() {}
  subscribe(stateType, component) {
    this.subscribedComponents[stateType].push(component);
  }
  getState(stateType, component) {
    if (this.subscribedComponents[stateType].include(component)) {
      return this.state[stateType];
    }
    throw new Error(ERROR_MSG.CAN_NOT_REFERENCE_STATE);
  }
  notifySubscribedView(stateType) {
    this.subscribedComponents[stateType].forEach(component => component.wakeUp());
  }
}

export default new VendingMachineStore();
