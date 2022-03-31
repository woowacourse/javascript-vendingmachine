import { ProductQuantity, ProductName, ProductPrice } from '../types/constants';

export const PRODUCT_NAME: ProductName = {
  MAX_LENGTH: 10,
  MIN_LENGTH: 1,
};

export const PRODUCT_PRICE: ProductPrice = {
  MAX_PRICE: 10000,
  MIN_PRICE: 100,
  UNIT: 10,
};

export const PRODUCT_QUANTITY: ProductQuantity = {
  MAX_QUANTITY: 20,
  MIN_QUANTITY: 1,
};
