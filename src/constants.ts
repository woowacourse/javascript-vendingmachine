import { AppState } from './types';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
};

export const COIN_UNITS = [500, 100, 50, 10];

export const initialState: AppState = {
  chargedMoney: 0,
  chargedCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  productList: [
    {
      name: '콜라',
      price: 1000,
      quantity: 1,
      isEditing: false,
    },
    {
      name: '사이다',
      price: 2000,
      quantity: 1,
      isEditing: false,
    },
    {
      name: '환티',
      price: 1000,
      quantity: 1,
      isEditing: false,
    },
  ],
};

export const VALIDATION_ERROR_NAME = 'validation-error';
