import { StringLiteral } from '@babel/types';
import { ICoinWallet, IProduct, TCoinWallet } from '../domains/types';
import { ACTION_TYPES } from '../utils/constants';

export type TVendingMachineAction =
  | 'addProduct'
  | 'editProduct'
  | 'deleteProduct'
  | 'rechargeChange';

export type TVendingMachineStateKey = keyof TVendingMachineState;

export type TVendingMachineState = {
  PRODUCT_LIST: Array<IProduct>;
  COIN_WALLET: ICoinWallet;
  INPUT_CHARGE: number;
};

export type TVendingMachineStateComponents = {
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
    actionType: TVendingMachineAction;
    payload: any;
    stateKey: TVendingMachineStateKey;
  }) => void;

  subscribe: (stateType: TVendingMachineStateKey, component: any) => void;

  getState: (
    stateType: TVendingMachineStateKey,
    component: any,
  ) => Array<IProduct> | ICoinWallet | number | undefined;

  notifySubscribedView: (stateType: TVendingMachineStateKey) => void;
}

export type TGlobalStateComponents = {
  AUTH_INFORMATION: Array<any>;
  CURRENT_ROUTE_NAME: Array<any>;
};

export type TGlobalAction = 'loginUser' | 'changeRoute' | 'logoutUser';

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
};

export interface IGlobalStore {
  mutateState: ({
    actionType,
    payload,
    stateKey,
  }: {
    actionType: TGlobalAction;
    payload: any;
    stateKey: TGlobalStateKey;
  }) => void;

  subscribe: (stateType: TGlobalStateKey, component: any) => void;

  getState: (
    stateType: TGlobalStateKey,
    component: any,
  ) =>
    | {
        loggedUser: TUser;
        isLoggedIn: boolean;
      }
    | string
    | undefined;

  notifySubscribedView: (stateType: TGlobalStateKey) => void;
}
