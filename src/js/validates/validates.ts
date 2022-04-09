import { ItemType } from '../types';
import { ERROR_MESSAGE, ITEM, OWN_MONEY, PURCHASE_MONEY } from '../constants/constants';

export const validateAddItemInput = ({ name, price, quantity }: ItemType) => {
  if (name.length === 0) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME_EMPTY_NAME);
  }
  if (name.length > ITEM.NAME.MAX_LENGTH) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME_OVER_MAX_LENGTH);
  }
  if (!Number.isInteger(price)) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE_NOT_INTEGER);
  }

  if (price < ITEM.PRICE.MIN) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE_UNDER_MIN);
  }
  if (price > ITEM.PRICE.MAX) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE_OVER_MAX);
  }
  if (price % ITEM.PRICE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.ITEM_PRICE_INVALID_UNIT);
  }

  if (!Number.isInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY_NOT_INTEGER);
  }
  if (quantity <= ITEM.QUANTITY.MIN) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY_UNDER_MIN);
  }
  if (quantity > ITEM.QUANTITY.MAX) {
    throw new Error(ERROR_MESSAGE.ITEM_QUANTITY_OVER_MAX);
  }
};

export const validateInputOwnMoney = (inputMoney: number) => {
  if (!Number.isInteger(inputMoney)) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_NOT_INTEGER);
  }
  if (inputMoney <= OWN_MONEY.MIN) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_UNDER_MIN);
  }
  if (inputMoney > OWN_MONEY.MAX) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_OVER_MAX);
  }
  if (inputMoney % OWN_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_INVALID_UNIT);
  }
};

export const validateInputPurchaseMoney = (inputMoney: number) => {
  if (!Number.isInteger(inputMoney)) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_NOT_INTEGER);
  }
  if (inputMoney <= PURCHASE_MONEY.MIN) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_UNDER_MIN);
  }
  if (inputMoney > PURCHASE_MONEY.MAX) {
    throw new Error(ERROR_MESSAGE.INPUT_PURCHASE_MONEY_OVER_MAX);
  }
  if (inputMoney % PURCHASE_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.INPUT_MONEY_INVALID_UNIT);
  }
};

export const checkDuplicatedItem = (items: ItemType[], newItem: ItemType, targetIndex: number) => {
  if (items.find((item, index) => index !== targetIndex && item.name === newItem.name)) {
    throw new Error(ERROR_MESSAGE.ITEM_NAME_DUPLICATED);
  }
};

export const validateReturnChange = (purchaseMoney, ownMoney) => {
  if (purchaseMoney === 0) {
    throw new Error(ERROR_MESSAGE.NO_INPUT_MONEY);
  }
  if (ownMoney === 0) {
    throw new Error(ERROR_MESSAGE.NO_CHANGE_MONEY);
  }
};

export const checkPassword = password => {
  const Regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/;
  if (!Regex.test(password)) {
    throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
  }
};
