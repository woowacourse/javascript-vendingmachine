import {
  TVendingMachineStateKey,
  TVendingMachineAction,
  TGlobalAction,
  TGlobalStateKey,
  TUser,
} from './../stores/types';
import { TCoinWallet, TCoinWalletKey } from '../domains/types';
import { TRange } from './types';

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
} = {
  PRODUCT_LIST: 'PRODUCT_LIST',
  COIN_WALLET: 'COIN_WALLET',
  INPUT_CHARGE: 'INPUT_CHARGE',
};

export const GLOBAL_STATE_KEYS: {
  AUTH_INFORMATION: TGlobalStateKey;
  CURRENT_ROUTE_NAME: TGlobalStateKey;
} = {
  AUTH_INFORMATION: 'AUTH_INFORMATION',
  CURRENT_ROUTE_NAME: 'CURRENT_ROUTE_NAME',
};

export const ERROR_MSG = {
  NAME_OVER_LIMIT_LENGTH: '상품 명은 10글자를 초과할 수 없습니다.',
  NAME_EMPTY: '상품 명을 최소 한 글자를 입력해주세요.',
  PRICE_OUT_OF_RANGE: '상품가격을 100이상 10000이하로 입력해주세요.',
  PRICE_NOT_DIVISIBLE_BY_10: '상품가격을 10으로 나누어 떨어지도록 입력해주세요.',
  QUANTITY_OUT_OF_RANGE: '상품 수량을 0이상 20이하의 수로 입력해주세요.',
  PRODUCT_SOLD_OUT: '상품이 매진되었습니다.',
  CAN_NOT_REFERENCE_STATE: '조회할 수 없는 상태값 입니다',
  CHANGE_NOT_DIVISIBLE_BY_10: '잔돈은 10으로 나누어 떨어져야합니다.',
  CHANGE_OUT_OF_RANGE: '잔돈은 10이상 100000이하의 금액을 투입하여야 합니다.',
};

export const NAME_LENGTH_LIMIT = 10;

export const PRICE_RANGE: TRange = {
  MIN: 100,
  MAX: 10000,
};

export const MONEY_DIVIDE_STANDARD = 10;

export const QUANTITY_RANGE: TRange = {
  MIN: 0,
  MAX: 20,
};

export const CHANGE_RANGE: TRange = {
  MIN: 10,
  MAX: 100000,
};

export const ACTION_TYPES: {
  ADD_PRODUCT: TVendingMachineAction;
  EDIT_PRODUCT: TVendingMachineAction;
  DELETE_PRODUCT: TVendingMachineAction;
  RECHARGE_CHANGE: TVendingMachineAction;
  LOGIN_USER: TGlobalAction;
  LOGOUT_USER: TGlobalAction;
  CHANGE_ROUTE: TGlobalAction;
} = {
  ADD_PRODUCT: 'addProduct',
  EDIT_PRODUCT: 'editProduct',
  DELETE_PRODUCT: 'deleteProduct',
  RECHARGE_CHANGE: 'rechargeChange',
  LOGIN_USER: 'loginUser',
  LOGOUT_USER: 'logoutUser',
  CHANGE_ROUTE: 'changeRoute',
};
