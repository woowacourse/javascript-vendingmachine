import {
  CHARGE_MONEY,
  ERROR_MESSAGE,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
} from '../constants';

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

export const checkValidChargeMoney = (money: number): void => {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }

  if (money % CHARGE_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }
};

export const checkValidPurchase = ({ quantity, price, userMoney }) => {
  if (quantity <= 0) {
    throw new Error('해당 상품은 매진되었습니다.');
  }
  if (userMoney < price) {
    throw new Error('현재 투입 금액으로 살 수 없는 상품입니다.');
  }
};
