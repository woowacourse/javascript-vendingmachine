import { Coins } from '../domains/VendingMachine';

export const CHARGE_AMOUNT = {
  LABEL: '충전 금액',
  MIN: 10,
  MAX: 100000,
  STEP: 10,
} as const;

export const ITEM = {
  NAME: {
    LABEL: '상품명',
    LENGTH: {
      MIN: 1,
      MAX: 10,
    },
  },
  PRICE: {
    LABEL: '가격',
    MIN: 100,
    MAX: 10000,
    STEP: 10,
  },
  QUANTITY: {
    LABEL: '수량',
    MIN: 1,
    MAX: 20,
  },
} as const;

export const COIN = {
  VALUES: [10, 50, 100, 500],
  EMPTY_COINS: {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  },
} as const;

export const PAGES = {
  LANDING: {
    TITLE: '',
    PATH: '',
  },
  ITEM_MANAGEMENT: {
    TITLE: '상품 관리',
    PATH: '#item-management',
  },
  CHANGE_CHARGE: {
    TITLE: '잔돈 충전',
    PATH: '#change-charge',
  },
  ITEM_PURCHASE: {
    TITLE: '상품 구매',
    PATH: '#item-purchase',
  },
  DEFAULT: {
    TITLE: '',
    PATH: '*',
  },
} as const;
