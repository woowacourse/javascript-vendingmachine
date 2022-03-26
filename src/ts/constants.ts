import { Icoins } from './types/vendingMachineCoinManager';
import {
  productQuantity,
  productName,
  productPrice,
  chargeMoney,
  errorMessage,
  routes,
} from './types/constants';

export const PRODUCT_NAME: productName = {
  MAX_LENGTH: 10,
  MIN_LENGTH: 1,
};

export const PRODUCT_PRICE: productPrice = {
  MAX_PRICE: 10000,
  MIN_PRICE: 100,
  UNIT: 10,
};

export const PRODUCT_QUANTITY: productQuantity = {
  MAX_QUANTITY: 20,
  MIN_QUANTITY: 1,
};

export const CHARGE_MONEY: chargeMoney = {
  MAX_TOTAL_CHARGE_MONEY: 100000,
  UNIT: 10,
};

export const ERROR_MESSAGE: errorMessage = {
  WRONG_LENGTH_PRODUCT_NAME: `상품명을 잘못 입력하셨습니다. 상품명은 ${PRODUCT_NAME.MIN_LENGTH}글자 부터 ${PRODUCT_NAME.MAX_LENGTH}글자 이하로 작성해주세요.`,
  DUPLICATED_PRODUCT_NAME:
    '중복된 상품명을 입력하셨습니다. 중복되지 않는 상품명을 다시 입력해주세요.',
  WRONG_RANGE_PRODUCT_PRICE: `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 이상 ${PRODUCT_PRICE.MAX_PRICE}원 이하로 입력해주세요.`,
  WRONG_UNIT_PRODUCT_PRICE: `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.UNIT}원 단위로 작성해주세요.`,
  WRONG_PRODUCT_QUANTITY: `상품 수량을 잘못 입력하셨습니다. 상품 수량은 최소 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 이상 최대 ${PRODUCT_QUANTITY.MAX_QUANTITY}개 이하로 작성해주세요.`,
  WRONG_UNIT_CHARGE_MONEY: `잔돈을 잘못 입력하셨습니다. 잔돈은 ${CHARGE_MONEY.UNIT}원 단위로 입력해주세요.`,
  EMPTY_PRODUCT_NAME:
    '상품명을 입력하지 않으셨습니다. 상품명을 먼저 입력해주세요.',
  OVERFLOW_CHARGE_MONEY(chargeMoney) {
    return `잔돈 누적 금액이 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}을 초과했습니다.<br />현재 누적 금액은 ${chargeMoney}원 입니다. 누적 금액이 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이 넘지 않도록 작성해주세요.`;
  },
};

export const DELETE_PRODUCT_CONFIRM_MESSAGE = (productName: string): string =>
  `상품명 : ${productName}\n해당하는 상품을 삭제할 경우 복구 하실 수 없습니다. 정말 삭제하시겠습니까?`;

export const COINS: Icoins = {
  INITIAL_STATE: {
    COIN_500: 0,
    COIN_100: 0,
    COIN_50: 0,
    COIN_10: 0,
  },
  LIST: [10, 50, 100, 500],
};

export const ROUTES: routes = {
  HOME: '/',
  PRODUCTS: '/products',
  COINS: '/coins',
};

export const SNACK_BAR_DELAY_TIME = 3000;
