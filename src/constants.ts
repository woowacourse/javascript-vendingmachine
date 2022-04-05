import { markUnit } from './utils';

export const COINS = [500, 100, 50, 10];

export const CONFIGURATION = {
  AMOUNT: {
    UNIT: 10,
    MAX: 100000,
  },
  PRICE: {
    UNIT: 10,
    MIN: 100,
    MAX: 10000,
  },
};

export const ELEMENT_KEY = {
  PRODUCT: 'subscribeProductManagement',
  CHARGE: 'subscribeChargeTab',
};

export const ERROR_MESSAGE = {
  DUPLICATED_PRODUCT: '중복되는 상품이 존재합니다.',
  INCORRECT_UNIT_PRODUCT_PRICE: `상품 가격은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  INCORRECT_UNIT_CHARGE_MONEY: `금액은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  OVER_AMOUNT: `현재 보유 금액은 ${markUnit(CONFIGURATION.AMOUNT.MAX)}원을 초과할 수 없습니다!`,
  INSUFFICIENT_CASH: `잔액이 부족합니다.`,
};

export const CONFIRM_MESSAGE = {
  DELETE: '해당 상품을 삭제하시겠습니까?',
};
