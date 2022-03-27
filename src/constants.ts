import { AppState } from './types';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
};

export const initialState: AppState = {
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
