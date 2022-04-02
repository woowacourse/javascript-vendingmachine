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
  NOT_DIVIDED_BY_COIN_UNIT: '상평통보는 안 받습니다. 10원단위로 넣어주세요!',
  NOT_DIVIDED_BY_PRODUCT_PRICE_UNIT: '10원단위로 가격을 입력해주세요~',
  INVALID_USER_MONEY: '10원단위로 나누어 떨어지는 금액만 투입 가능합니다~',
  NOT_WITHIN_PRODUCT_PRICE_RANGE: '100원 이상, 10,000원 이하의 가격을 입력주세요~',
  OVER_BALANCE_LIMIT: '돈통이 가득찼어요! 100,000원 까지만 보관 가능합니다.',
  OVER_PRODUCT_NAME_LENGTH_LIMIT: '10글자 미만의 상품명을 넣어주세요~',
  OVER_PRODUCT_QUANTITY_LIMIT: '수량은 최대 20개까지만 가능합니다~',
  OVER_USER_MONEY_LIMIT: '10,000원까지만 투입 가능합니다',
  DUPLICATE_PRODUCT_NAME_EXIST: '중복된 상품명입니다',
} as const;

export const URL_PATH = {
  HOME: '/',
  PRODUCT_MANAGE: '/productManage',
  BALANCE_CHAREGE: '/balanceCharge',
  PRODUCT_PURCHASE: '/productPurchase',
} as const;

export const CHEAPEST_PAPER_MONEY_UNIT = 1000;

export const PRODUCT_CONDITION = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  UNIT_PRICE: 10,
  MAX_QUANTITY: 20,
} as const;
