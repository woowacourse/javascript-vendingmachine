export const CHARGE_AMOUNT = {
  LABEL: '충전 금액',
  MIN: 10,
  MAX: 100000,
  STEP: 10,
} as const;

export const INSERT_AMOUNT = {
  LABEL: '투입 금액',
  MIN: 10,
  MAX: 10000,
  STEP: 10,
};

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

export const USER = {
  EMAIL: {
    LENGTH: {
      MAX: 40,
    },
  },
  NAME: {
    LENGTH: {
      MIN: 2,
      MAX: 6,
    },
  },
  PASSWORD: {
    LENGTH: {
      MIN: 8,
      MAX: 30,
    },
  },
} as const;

export const PAGES = {
  LANDING: {
    TITLE: '',
    PATH: '/',
  },
  ITEM_MANAGEMENT: {
    TITLE: '상품 관리',
    PATH: '/item-management',
  },
  CHANGE_CHARGE: {
    TITLE: '잔돈 충전',
    PATH: '/change-charge',
  },
  ITEM_PURCHASE: {
    TITLE: '상품 구매',
    PATH: '/item-purchase',
  },
  LOGIN: {
    PATH: '/login',
  },
  SIGNUP: {
    PATH: '/signup',
  },
  PROFILE: {
    PATH: '/profile',
  },
  DEFAULT: {
    TITLE: '',
    PATH: '/*',
  },
} as const;

export const REDICTION = {
  LANDING: 'landing',
  LOGIN: 'login',
  AUTHORIZED: 'authorized',
} as const;
