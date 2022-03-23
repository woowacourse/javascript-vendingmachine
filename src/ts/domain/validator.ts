import { Product } from './VendingMachine';
import { ERROR_MESSAGE } from '../constants';

const isOverNameMinLength = (name: string) => name.length > 10;

const isOutOfPriceRange = (price: number) => price < 100 || price > 10000;

const isInvalidPriceUnit = (price: number) => price % 10 !== 0;

const isOverMaxQuantity = (quantity: number) => quantity > 20;

export const checkProductValidation = (product: Product) => {
  if (isOverNameMinLength(product.name)) {
    throw new Error(ERROR_MESSAGE.NAME);
  }
  if (isOutOfPriceRange(product.price)) {
    throw new Error(ERROR_MESSAGE.PRICE_RANGE);
  }
  if (isInvalidPriceUnit(product.price)) {
    throw new Error(ERROR_MESSAGE.PRICE_UNIT);
  }
  if (isOverMaxQuantity(product.quantity)) {
    throw new Error(ERROR_MESSAGE.EXCEED_QUANTITY);
  }
};
