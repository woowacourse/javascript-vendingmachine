import { AppState } from '../types';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
  CHANGE_ACTIVE_TAB: 'change-active-tab',
  INSERT_MONEY: 'insert-money',
  RETURN_CHANGES: 'return-changes',
  PURCHASE_PRODUCT: 'purchase-product',
};

export const COIN_UNITS = [500, 100, 50, 10];

export const INITIAL_STATE: AppState = {
  chargedMoney: 0,
  insertedMoney: 0,
  chargedCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  returnCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  productList: [],
};
