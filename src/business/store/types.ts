import { ICoinWallet, IProduct } from '../../domains/types';

export type TVendingMachineStateKey = keyof TVendingMachineState;

export type TVendingMachineState = {
  PRODUCT_LIST: Array<IProduct>;
  COIN_WALLET: ICoinWallet;
  INPUT_CHARGE: number;
  RETURN_COIN: ICoinWallet;
};

export type TVendingMachineStateComponents = {
  PRODUCT_LIST: Array<any>;
  COIN_WALLET: Array<any>;
  INPUT_CHARGE: Array<any>;
  RETURN_COIN: Array<any>;
};

export interface IVendingMachineStore {
  subscribe: (stateType: TVendingMachineStateKey, component: any) => void;

  setState: (key: TVendingMachineStateKey, valueOrFunction: any) => void;

  getState: (
    stateType: TVendingMachineStateKey,
  ) => Array<IProduct> | ICoinWallet | number | undefined;

  notifySubscribedView: (stateType: TVendingMachineStateKey) => void;
}

export type TGlobalStateComponents = {
  AUTH_INFORMATION: Array<any>;
  CURRENT_ROUTE_NAME: Array<any>;
  IS_LOADING: Array<any>;
};

export type TUser = {
  id: number;
  email: string;
  name: string;
} | null;

export type TGlobalStateKey = keyof TGlobalState;

export type TGlobalState = {
  AUTH_INFORMATION: {
    loggedUser: TUser;
    isLoggedIn: boolean;
  };
  CURRENT_ROUTE_NAME: string;
  IS_LOADING: boolean;
};

export interface IGlobalStore {
  subscribe: (stateType: TGlobalStateKey, component: any) => void;

  setState: (key: TGlobalStateKey, valueOrFunction: any) => void;

  getState: (stateType: TGlobalStateKey) =>
    | {
        loggedUser: TUser;
        isLoggedIn: boolean;
      }
    | string
    | boolean
    | undefined;

  notifySubscribedView: (stateType: TGlobalStateKey) => void;
}
