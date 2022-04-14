import { markUnit } from './utils';

export const COINS = [500, 100, 50, 10];

export const BASE_URL = '/javascript-vendingmachine';
export const SERVER_ORIGIN = 'https://json-auth-server-jz.herokuapp.com';

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

export enum ELEMENT_KEY {
  PRODUCT = 'subscribeProductManagement',
  CHARGE = 'subscribeChargeTab',
  SIGNUP = 'subscribeSignupPage',
  LOGIN = 'subscribeLoginPage',
  PROFILE_EDIT = 'subscribeProfileEditPage',
  USER_MENU = 'userMenu',
  PURCHASE = 'subscribePurchaseTab',
}

export enum ELEMENT_ACTION {
  INSERT_ITEM = 'insert-item',
  UPDATE_ITEM = 'update-item',
  DELETE_ITEM = 'delete-item',
  INSERT_COIN = 'insert-coin',
  PURCHASE = 'purchase',
  UPDATE_PRODUCT = 'update-product',
  DELETE_PRODUCT = 'delete-product',
  RETURN_OF_CHANGE = 'return-of-change',
}

export const CUSTOM_EVENT = {
  PRODUCT: {
    ADD: '@add',
    UPDATE: '@update',
    DELETE: '@delete',
    PURCHASE: '@purchase',
  },
  AUTH: {
    SIGNUP: '@signup',
    LOGIN: '@login',
    EDIT: '@edit',
  },
  CHARGE: '@charge',
  INSERT_COIN: '@insert-coin',
  RETURN_OF_CHANGE: '@return-of-change',
};

export const ERROR_MESSAGE = {
  DUPLICATED_PRODUCT: '중복되는 상품이 존재합니다.',
  INCORRECT_UNIT_PRODUCT_PRICE: `상품 가격은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  INCORRECT_UNIT_CHARGE_MONEY: `금액은 ${CONFIGURATION.PRICE.UNIT}원 단위로 나누어 떨어지는 금액으로 입력하세요.`,
  OVER_AMOUNT: `현재 보유 금액은 ${markUnit(CONFIGURATION.AMOUNT.MAX)}원을 초과할 수 없습니다!`,
  INSUFFICIENT_CASH: `잔액이 부족합니다.`,
  INSUFFICIENT_NAME: '이름은 2글자 이상, 6글자 이하로 입력해주세요.',
  INSUFFICIENT_PASSWORD: '비밀번호는 숫자와 영문자 조합으로 8글자 이상, 20글자 이하를 입력해주세요.',
  WRONG_PASSWORD: '비밀번호와 비밀번호 확인란이 일치하지 않습니다.',
  UNAUTHORIZED_IN_EDIT: '로그인 유저만 회원정보를 수정할 수 있습니다. 다시 로그인을 해주세요.',
  OVER_USER_AMOUNT: '투입 금액이 10,000원을 초과할 수 없습니다.',
  NO_RETURN_CHANGE: '반환할 잔액이 없습니다.',
  DENY: '로그인 후 이용할 수 있습니다.',
};

export const CONFIRM_MESSAGE = {
  DELETE: '해당 상품을 삭제하시겠습니까?',
};

export const SUCCESS_MESSAGE = {
  EDIT: '성공적으로 회원 정보가 수정되었습니다.',
  INSERT_COIN: '성공적으로 금액을 투입했습니다.',
  PURCHASE: '성공적으로 상품을 구매했습니다.',
  RETURN: '성공적으로 잔돈이 반환되었습니다. 자판기의 잔액이 부족할 경우 자판기에 존재하는 금액만큼만 반환됩니다.',
};
