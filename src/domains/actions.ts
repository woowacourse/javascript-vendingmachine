import {
  AuthActionType,
  CoinActionType,
  ModifyDetail,
  MoneyActionType,
  ProductActionType,
  Product,
} from '../abstracts/interfaces';

export const createAction = (type: string, detail?: Product | ModifyDetail | string | number) => ({
  type,
  detail,
});

export const AUTH_ACTION: AuthActionType = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export const PRODUCT_ACTION: ProductActionType = {
  ADD: 'product-add',
  MODIFY: 'product-modify',
  DELETE: 'product-delete',
  PURCHASE: 'product-purchase',
};

export const COIN_ACTION: CoinActionType = {
  CHARGE: 'charge',
  RETURN: 'return',
};

export const MONEY_ACTION: MoneyActionType = {
  INPUT: 'input',
};
