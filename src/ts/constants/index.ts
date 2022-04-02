const MAX_NAME_LENGTH = 10;
const PRICE_RULE = {
  MIN: 100,
  MAX: 10000,
  UNIT: 10,
};
const MAX_QUANTITY = 20;

const coinType: [500, 100, 50, 10] = [500, 100, 50, 10];

const CASH_RULE = {
  MIN: 1,
  MAX: 100000,
  UNIT: 10,
};

const MONEY_RULE = {
  MIN: 1,
  MAX: 10_000,
  UNIT: 10,
};

const MESSAGE = {
  ERROR_SAME_PRODUCT: '이미 동일한 이름의 상품이 존재합니다.',
  ERROR_OVER_MAX_LENGTH: `상품명을 ${MAX_NAME_LENGTH}글자 이하로 입력해주세요.`,
  ERROR_INVALID_PRICE: `가격은 ${PRICE_RULE.MIN.toLocaleString()}원 이상 ${PRICE_RULE.MAX.toLocaleString()}원 이하여야 하며, ${
    PRICE_RULE.UNIT
  }으로 나누어 떨어져야 합니다.`,
  ERROR_OVER_MAX_QUANTITY: `상품 수량은 1개 이상 ${MAX_QUANTITY}개 이하로 입력해주세요.`,
  ERROR_EMPTY_VALUE: '상품 정보를 공백 없이 입력해주세요.',
  CONFIRM_DELETE_PRODUCT: '을(를) 삭제하시겠습니까?',
  NOT_ENOUGH_COINS: '동전이 부족하여 모두 반환되지 못 하였습니다.',
};

export {
  MESSAGE,
  MAX_NAME_LENGTH,
  PRICE_RULE,
  MAX_QUANTITY,
  coinType,
  CASH_RULE,
  MONEY_RULE,
};
