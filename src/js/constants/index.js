export const PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  PRICE_UNIT: 10,
  MIN_STOCK: 1,
  MAX_STOCK: 20,
};

export const VENDING_MACHINE_RULES = {
  CHANGE_UNIT: 10,
  MAX_TOTAL_CHANGE: 100000,
};

export const ERROR_MESSAGE = {
  CONTAIN_EMPTY_FIELD_IN_FORM: '상품명, 가격, 수량을 모두 입력해주세요.',

  PRODUCT_NAME: {
    EXCEED_MAX_LENGTH: `상품명은 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자를 초과해서는 안됩니다.`,
    DUPLICATE_VALUE: '중복된 상품명의 상품은 등록할 수 없습니다.',
  },

  PRODUCT_PRICE: {
    OUT_OF_RANGE: `상품 가격은 ${PRODUCT_RULES.MIN_PRICE}원 미만이거나 ${PRODUCT_RULES.MAX_PRICE}원 초과할 수 없습니다.`,
    INVALID_UNIT: `상품 가격은 ${PRODUCT_RULES.PRICE_UNIT}원 단위여야 합니다.`,
  },

  PRODUCT_STOCK: {
    INVALID_VALUE: '올바른 수량을 입력해주세요',
    OUT_OF_RANGE: `상품 수량은 ${PRODUCT_RULES.MIN_STOCK}개 미만이거나 ${PRODUCT_RULES.MAX_STOCK}개 초과할 수 없습니다.`,
  },

  PRODUCT_ID_NOT_FOUND: '존재하지 않는 상품 아이디입니다.',

  CHANGE: {
    BELOW_MIN: '충전 금액은 0원 이하일 수 없습니다.',
    INVALID_UNIT: `충전 금액은 ${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위이어야 합니다.`,
    EXCEED_MAX_TOTAL: `최대 보유 금액은 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과할 수 없습니다.`,
  },
};

export const CONFIRM_DELETE_MESSAGE = '해당 상품을 정말 삭제하시겠습니까?';
