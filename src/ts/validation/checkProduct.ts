import { Product } from '../types/vendingMachineProductManager';

import { ERROR_MESSAGE } from '../constants/errorMessage';
import {
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../constants/product';

export const checkValidLengthProductName = (name: string): void => {
  if (!name.trim()) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  }

  if (
    name.length < PRODUCT_NAME.MIN_LENGTH ||
    name.length > PRODUCT_NAME.MAX_LENGTH
  ) {
    throw new Error(ERROR_MESSAGE.WRONG_LENGTH_PRODUCT_NAME);
  }
};

export const checkDuplicatedProductName = (
  products: Product[],
  newProduct: Product
): void => {
  if (products.some((product: Product) => product.name === newProduct.name)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};

export const checkEditDuplicateName = (
  editIndex: number,
  duplicatedNameIndex: number
): void => {
  if (duplicatedNameIndex !== -1 && editIndex !== duplicatedNameIndex) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};

export const checkValidProductPrice = (price: number): void => {
  if (Number.isNaN(price)) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  }

  if (price < PRODUCT_PRICE.MIN_PRICE || price > PRODUCT_PRICE.MAX_PRICE) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  }

  if (price % PRODUCT_PRICE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
  }
};

export const checkValidProductQuantity = (quantity: number): void => {
  if (Number.isNaN(quantity)) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }

  if (!Number.isInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }

  if (
    quantity < PRODUCT_QUANTITY.MIN_QUANTITY ||
    quantity > PRODUCT_QUANTITY.MAX_QUANTITY
  ) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }
};
