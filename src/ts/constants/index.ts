const MAX_NAME_LENGTH = 10;
const PRICE_RULE = {
  MIN: 100,
  MAX: 10000,
  UNIT: 10,
};
const MAX_QUANTITY = 20;

const MESSAGE = {
  ERROR_SAME_PRODUCT: '이미 동일한 이름의 상품이 존재합니다.',
  ERROR_OVER_MAX_LENGTH: `상품명을 ${MAX_NAME_LENGTH}글자 이하로 입력해주세요.`,
  ERROR_INVALID_PRICE: `가격은 ${
    PRICE_RULE.MIN
  }원 이상 ${PRICE_RULE.MAX.toLocaleString()}원 이하여야 하며, ${
    PRICE_RULE.UNIT
  }으로 나누어 떨어져야 합니다.`,
  ERROR_OVER_MAX_QUANTITY: `상품 수량은 ${MAX_QUANTITY}개 이하로 입력해주세요.`,
};

export { MESSAGE, MAX_NAME_LENGTH, PRICE_RULE, MAX_QUANTITY };
