export const PAGE = {
  ITEM_MANAGEMENT: {
    PATH: '#item-management',
    TITLE: '상품 관리',
  },
  CHANGE_CHARGE: {
    PATH: '#change-charge',
    TITLE: '잔돈 충전',
  },
  ITEM_PURCHASE: {
    PATH: '#item-purchase',
    TITLE: '상품 구매',
  },
};

export const ITEM = {
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 10000,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 20,
  },
};

export const MONEY_UNIT = 10;

export const COINS = [10, 50, 100, 500];

export const AMOUNT = {
  MIN: 10,
  MAX: 100000,
  MAX_TOTAL_MONEY: 100000,
};

export const ERROR_MESSAGE = {
  NOT_FOUND: '존재하지 않는 이이탬입니다.',
  NAME_ALREADY_USED:
    '이미 존재하는 아이템 이름입니다. 다른 이름을 사용해주세요.',
  OVER_MAX_QUANTITY: `상품의 최대 수량은 ${ITEM.QUANTITY.MAX}개입니다.`,
  WRONG_PRICE_UNIT: `가격은 ${MONEY_UNIT}원 단위여야 합니다.`,
  WRONG_NAME_LENGTH: `상품명은 ${ITEM.NAME.MIN_LENGTH}~${ITEM.NAME.MAX_LENGTH} 글자 사이여야 합니다.`,
  WRONG_PRICE_RANGE: `상품 가격은 ${ITEM.PRICE.MIN}원 이상, ${ITEM.PRICE.MAX}원 이하여야 합니다.`,
  WRONG_AMOUNT_RANGE: `${AMOUNT.MIN}~${AMOUNT.MAX} 범위의 금액을 입력해주세요`,
  WRONG_AMOUNT_UNIT: `입력 금액은 ${MONEY_UNIT}원 단위여야 합니다`,
  OVERFLOW_TOTAL_MONEY: `총액은 최대 ${AMOUNT.MAX_TOTAL_MONEY}까지 가능합니다`,
};

export const CONFIRM_MESSAGE = {
  DELETE: '정말로 삭제하시겠습니까?',
};
