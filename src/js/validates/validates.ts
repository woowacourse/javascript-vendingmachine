import { ItemType } from '../types/types';
import { ERROR_MESSAGE, ITEM, MONEY } from '../constants/constants';

export const validateAddItemInput = ({ name, price, quantity }: ItemType) => {
  if (name.length === 0) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME.EMPTY_NAME);
  }
  if (name.length > ITEM.NAME.MAX_LENGTH) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME.OVER_MAX_LENGTH);
  }
  if (!Number.isInteger(price)) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE.NOT_INTEGER);
  }

  if (price < ITEM.PRICE.MIN) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE.UNDER_MIN);
  }
  if (price > ITEM.PRICE.MAX) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE.OVER_MAX);
  }
  if (price % ITEM.PRICE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE.INVALID_UNIT);
  }

  if (!Number.isInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY.NOT_INTEGER);
  }
  if (quantity <= ITEM.QUANTITY.MIN) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY.UNDER_MIN);
  }
  if (quantity > ITEM.QUANTITY.MAX) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY.OVER_MAX);
  }
};

export const validateInputMoney = (inputMoney: number) => {
  if (!Number.isInteger(inputMoney)) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY.NOT_INTEGER);
  }
  if (inputMoney <= MONEY.MIN) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY.UNDER_MIN);
  }
  if (inputMoney > MONEY.MAX) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY.OVER_MAX);
  }
  if (inputMoney % MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY.INVALID_UNIT);
  }
};

export const checkDuplicatedItem = (items: ItemType[], newItem: ItemType, targetIndex: number) => {
  if (items.find((item, index) => index !== targetIndex && item.name === newItem.name)) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME.DUPLICATE_ITEM);
  }
};
