import { markUnit } from './utils';

export const COINS = [10, 50, 100, 500];

export const COINS_REVERSE = [500, 100, 50, 10];

export const SNACK_BAR_SHOWING_TIME_IN_MS = 2000;

export const CONFIGURATION = {
  NAME: {
    MAX_LENGTH: 10,
  },
  AMOUNT: {
    UNIT: 10,
    MAX: 100000,
  },
  PRICE: {
    UNIT: 10,
    MIN: 100,
    MAX: 10000,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 20,
  },
  INPUT: {
    MIN: 10,
    MAX: 10000,
  },
};

export const ELEMENT_KEY = {
  PRODUCT: 'subscribeProductManagement',
  CHARGE: 'subscribeChargeTab',
  PURCHASE: 'subscribePurchaseTab',
};

export const ERROR_MESSAGE = {
  DUPLICATED_PRODUCT: '중복되는 상품이 존재합니다.',
  INCORRECT_UNIT_PRODUCT_PRICE: `상품 가격은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  INCORRECT_UNIT_CHARGE_MONEY: `금액은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  OVER_AMOUNT: `현재 보유 금액은 ${markUnit(CONFIGURATION.AMOUNT.MAX)}원을 초과할 수 없습니다!`,
  OVER_INPUT_MONEY: `투입 금액은 ${markUnit(CONFIGURATION.INPUT.MAX)}원을 초과할 수 없습니다!`,
  INCORRECT_UNIT_INPUT_MONEY: `금액은 ${CONFIGURATION.INPUT.MIN}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  NOT_ENOUGH_MONEY: `잔액이 부족합니다.`,
  PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
  DUPLICATED_EMAIL: '중복된 이메일이 존재합니다.',
  NOT_MATCH_USER_INFO: '일치하는 정보가 없습니다.',
  EMPTY_CHANGE: '자판기에 보유중인 잔돈이 없습니다. 관리자에게 문의해주세요.',
};
