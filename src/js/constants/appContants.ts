// javascript-vendingmachine

export const URL = {
  BASE_URL: '',
  MAIN: 'main',
  SIGN: 'sign',
  MANAGE_ITEM: `manageItem`,
  CHARGE_MONEY: `chargeMoney`,
  PURCHASE_ITEM: `purchaseItem`,
  SIGN_IN: 'signIn',
  SING_UP: 'singUp',
  EDIT_PROFILE: 'editProfile',
};

export const CUSTOM_EVENT = {
  ROUTE_CHANGE: 'ROUTE_CHANGE',
  PAGE_CHANGE: 'PAGE_CHANGE',
  CHARGE_MONEY: 'CHARGE_MONEY',
  ADD_ITEM: 'ADD_ITEM',
  TABLE_ITEM_CHANGE: 'TABLE_ITEM_CHANGE',
  TABLE_ITEM_DELETE: 'TABLE_ITEM_DELETE',
};

export const FIRST_INDEX = 0;

export const SIGN_INPUT = {
  NAME: {
    MIN: 2,
    MAX: 6,
  },
  PASSWORD: {
    MIN: 8,
  },
};
