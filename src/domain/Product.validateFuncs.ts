import { ERR_PRODUCT } from '../constants/errorMessage';
import { PRODUCT_CONDITION } from '../constants/domain';

export const validateAllProductProps = (name: string, price: number, quantity: number) => {
  try {
    validateProductName(name);
    validateProductPrice(price);
    validateProductQuantity(quantity);
  } catch (err) {
    throw err;
  }
};

export function validateProductName(name: string) {
  if (name.length > PRODUCT_CONDITION.MAX_NAME_LENGTH) {
    throw new Error(ERR_PRODUCT.LONG_NAME);
  }
}

export function validateProductPrice(price: number) {
  if (price < PRODUCT_CONDITION.MIN_PRICE || price > PRODUCT_CONDITION.MAX_PRICE) {
    throw new Error(ERR_PRODUCT.OUT_OF_RANGE_INPUT);
  }
  if (price % PRODUCT_CONDITION.UNIT_PRICE !== 0) {
    throw new Error(ERR_PRODUCT.SMALL_INPUT_THAN_UNIT);
  }
}

export function validateProductQuantity(quantity: number) {
  if (quantity > PRODUCT_CONDITION.MAX_QUANTITY) {
    throw new Error(ERR_PRODUCT.EXCEED_MAX_QUANTITY);
  }
  if (quantity < 0) {
    throw new Error(ERR_PRODUCT.NEGATIVE_QUANTITY);
  }
}
