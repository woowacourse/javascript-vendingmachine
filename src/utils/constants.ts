export const AUTH_CONDITION = {
  MIN_USER_NAME_LENGTH: 2,
  MAX_USER_NAME_LENGTH: 6,
  MIN_USER_PASSWORD_LENGTH: 8,
  MAX_USER_PASSWORD_LENGTH: 16,
} as const;

export const API_URL = 'https://albur-vm-json-server-auth.herokuapp.com';

export const CHEAPEST_COIN = 10;

export const COIN_CONDITION = {
  UNIT_PRICE: 10,
} as const;

export const COINS_INIT_QUANTITY = {
  coin500: 0,
  coin100: 0,
  coin50: 0,
  coin10: 0,
} as const;

export const COINS_UNIT_TABLE = {
  coin500: 500,
  coin100: 100,
  coin50: 50,
  coin10: 10,
} as const;

export const COIN_VAULT_CONDITION = {
  MAX_BALANCE: 100000,
} as const;

export const ERROR_MESSAGE = {
  DUPLICATE_PRODUCT_NAME_EXIST: '중복된 상품명입니다',
  NOT_DIVIDED_BY_COIN_UNIT: '상평통보는 안 받습니다. 10원단위로 넣어주세요!',
  NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT: '10원단위로 가격을 입력해주세요~',
  MORE_PURCHASE_MONEY_NEEDED: '상품을 구매할 금액이 부족합니다. 더 투입해주세요~',
  INVALID_PURCHASE_MONEY: '10원단위로 나누어 떨어지는 금액만 투입 가능합니다~',
  INVALID_USER_NAME_LENGTH: '이름은 2~6글자까지 가능합니다~',
  INVALID_USER_PASSWORD: '비밀번호는 8~16자 영어, 숫자, 특수문자로 구성되있어야 합니다~',
  INCORRECT_USER_ID_AND_PASSWORD: '아이디와 비밀번호를 확인해주세요~',
  NO_COINS: '현재 자판기에 잔돈이 부족하여 반환이 불가능합니다. 관리자에게 문의해주세요~',
  NO_PURCHASE_MONEY: '투입하신 금액이 없습니다.',
  NOT_SAME_PASSWORD: '비밀번호가 같지 않습니다.',
  NOT_WITHIN_PRODUCT_PRICE_RANGE: '100원 이상, 10,000원 이하의 가격을 입력주세요~',
  OVER_BALANCE_LIMIT: '돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.',
  OVER_PRODUCT_NAME_LENGTH_LIMIT: '10글자 미만의 상품명을 넣어주세요~',
  OVER_PRODUCT_QUANTITY_LIMIT: '수량은 최대 20개까지만 가능합니다~',
  OVER_PURCHASE_MONEY_LIMIT: '10,000원까지만 투입 가능합니다',
  SAME_EMAIL_EXIST: '같은 이메일이 존재합니다',
} as const;

export const URL_PATH = {
  HOME: '/',
  BALANCE_CHARGE: '/balanceCharge',
  LOGIN: '/login',
  SIGNUP: '/signup',
  EDIT_USER_INFO: '/editUserInfo',
  PRODUCT_MANAGE: '/productManage',
  PRODUCT_PURCHASE: '/productPurchase',
} as const;

export const PRODUCT_CONDITION = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  UNIT_PRICE: 10,
  MAX_QUANTITY: 20,
} as const;
