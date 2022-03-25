import { ICoinWallet, IProduct, TCoinWallet } from '../domains/types';
import { ACTION_TYPES } from '../utils/constants';

export type TAction = 'addProduct' | 'editProduct' | 'deleteProduct' | 'rechargeChange';

export type TStateKey = 'PRODUCT_LIST' | 'COIN_WALLET' | 'INPUT_CHARGE';

export type TState = {
  PRODUCT_LIST: Array<IProduct>;
  COIN_WALLET: ICoinWallet;
  INPUT_CHARGE: number;
};

export type TSubscribedComponents = {
  PRODUCT_LIST: Array<any>;
  COIN_WALLET: Array<any>;
  INPUT_CHARGE: Array<any>;
};
export interface IVendingMachineStore {
  mutateState: ({
    actionType,
    payload,
    stateKey,
  }: {
    actionType: TAction;
    payload: any;
    stateKey: TStateKey;
  }) => void;

  subscribe: (stateType: TStateKey, component: any) => void;

  getState: (
    stateType: TStateKey,
    component: any,
  ) => Array<IProduct> | ICoinWallet | number | undefined;

  notifySubscribedView: (stateType: TStateKey) => void;
}
