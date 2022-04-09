import { TGlobalStateKey, TVendingMachineStateKey } from '../../business/store/types';
import { TCoinWallet, TCoinWalletKey } from '../../domains/types';

export const COIN_VALUES: TCoinWallet = {
  coin500: 500,
  coin100: 100,
  coin50: 50,
  coin10: 10,
};

export const COIN_KEYS: Array<TCoinWalletKey> = ['coin500', 'coin100', 'coin50', 'coin10'];

export const VENDING_MACHINE_STATE_KEYS: {
  PRODUCT_LIST: TVendingMachineStateKey;
  COIN_WALLET: TVendingMachineStateKey;
  INPUT_CHARGE: TVendingMachineStateKey;
  RETURN_COIN: TVendingMachineStateKey;
} = {
  PRODUCT_LIST: 'PRODUCT_LIST',
  COIN_WALLET: 'COIN_WALLET',
  INPUT_CHARGE: 'INPUT_CHARGE',
  RETURN_COIN: 'RETURN_COIN',
};

export const GLOBAL_STATE_KEYS: {
  AUTH_INFORMATION: TGlobalStateKey;
  CURRENT_ROUTE_NAME: TGlobalStateKey;
  IS_LOADING: TGlobalStateKey;
} = {
  AUTH_INFORMATION: 'AUTH_INFORMATION',
  CURRENT_ROUTE_NAME: 'CURRENT_ROUTE_NAME',
  IS_LOADING: 'IS_LOADING',
};

export const WEB_STORAGE_KEY = {
  USER: 'logged-user',
  ACCESS_TOKEN: 'access-token',
};
