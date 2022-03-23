export const ERROR_MESSAGE = {
  EXCEED_MAX_PRODUCT_NAME_LENGTH: '상품명은 10글자를 초과해서는 안됩니다.',
  OUT_OF_PRODUCT_PRICE_RANGE:
    '상품 가격은 100원 미만이거나 10000원 초과일 수 없습니다.',
  INVALID_UNIT_PRODUCT_PRICE: '상품 가격은 10원 단위여야 합니다.',
  EXCEED_MAX_PRODUCT_STOCK: '상품 수량은 20개 초과해서는 안됩니다.',
  DUPLICATE_PRODUCT_NAME: '중복된 상품명의 상품은 등록할 수 없습니다.',
  NOT_FOUND_PRODUCT_ID: '존재하지 않는 상품 아이디입니다.',
  INVALID_UNIT_CHANGE: '충전 금액은 10원 단위이어야 합니다.',
  EXCEED_MAX_TOTAL_CHANGE: '최대 보유 금액은 100,000원을 초과할 수 없습니다.',
};

export const PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  PRICE_UNIT: 10,
  MAX_STOCK: 20,
};

export const VENDING_MACHINE_RULES = {
  CHANGE_UNIT: 10,
  MAX_TOTAL_CHANGE: 100000,
};
