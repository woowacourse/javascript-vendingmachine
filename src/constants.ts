import { AppState } from './types';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
};

export const initialState: AppState = {
  productList: [],
};

export const VALIDATION_ERROR_NAME = 'validation-error';
