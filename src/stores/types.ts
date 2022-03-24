import { ICoinWallet, IProduct, TCoinWallet } from '../domains/types';

export type TAction = string;

export type TStateKey = 'PRODUCT_LIST' | 'COIN_WALLET' | 'INPUT_CHARGE';

export type TState = {
  PRODUCT_LIST: Array<IProduct>;
  COIN_WALLET: ICoinWallet;
  INPUT_CHARGE: number;
};

export type TSubsrcribedComponents = {
  PRODUCT_LIST: Array<any>;
  COIN_WALLET: Array<any>;
  INPUT_CHARGE: Array<any>;
};
export interface IVendingMachineStore {
  mutateProductList: (actionType: TAction, payload: any) => void;
  mutateCoinWallet: (actionType: TAction, payload: any) => void;
  mutateInputCharge: (actionType: TAction, payload: any) => void;
  subscribe: (stateType: TStateKey, component: any) => void;
  getState: (
    stateType: TStateKey,
    component: any,
  ) => Array<IProduct> | ICoinWallet | number | undefined;
  notifySubscribedView: (stateType: TStateKey) => void;
}
