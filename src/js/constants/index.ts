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

  USER_MONEY_UNIT: 10,
  MAX_TOTAL_USER_MONEY: 10000,
};

export const USER_REGISTER_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 6,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()[\]{}\-:;',?/~^+=<>]).{8,20}$/,
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

  PRODUCT_ID_NOT_FOUND: '존재하지 않는 상품입니다.',

  CHANGE: {
    BELOW_MIN: '충전 금액은 0원 이하일 수 없습니다.',
    INVALID_UNIT: `충전 금액은 ${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위이어야 합니다.`,
    EXCEED_MAX_TOTAL: `최대 보유 금액은 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과할 수 없습니다.`,
  },

  USER_MONEY: {
    BELOW_MIN: '투입 금액은 0원 이하일 수 없습니다.',
    INVALID_UNIT: `투입 금액은 ${VENDING_MACHINE_RULES.USER_MONEY_UNIT}원 단위이어야 합니다.`,
    EXCEED_MAX_TOTAL: `최대 보유 금액은 ${VENDING_MACHINE_RULES.MAX_TOTAL_USER_MONEY}원을 초과할 수 없습니다.`,
  },

  PURCHASE: {
    INSUFFICIENT_MONEY: '구매하려는 상품 가격보다 투입 금액이 적습니다.',
  },

  RETURN_CHANGE: {
    NO_USER_MONEY: '반환할 금액이 없습니다.',
  },

  USER_DATA: {
    MISSING_REQUIRED_DATA: '모든 항목은 필수적으로 작성해야 합니다.',
    NAME_LENGTH_OUT_OF_RANGE: `이름은 ${USER_REGISTER_RULES.NAME_MIN_LENGTH}자-${USER_REGISTER_RULES.NAME_MAX_LENGTH}자여야 합니다.`,
    INVALID_PASSWORD: '비밀번호가 올바르지 않습니다. 비밀번호 규칙을 다시 확인 해주세요.',
    NO_MATCH_PASSWORD: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    DUPLICATE_EMAIL: '이미 가입 내역이 존재하는 이메일입니다.',
    INCORRECT_LOGIN_DATA: '가입 내역이 없는 이메일이거나 비밀번호가 바르지 않습니다.',
    SERVER_FAILURE: '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
};

export const USER_DATA_CHANGED_MESSAGE = '개인 정보 수정이 완료되었습니다.';

export const NOT_ENOUGH_CHANGE_MESSAGE =
  '자판기가 보유한 잔돈이 부족합니다. 관리자에게 문의해주세요.';

export const CONFIRM_DELETE_MESSAGE = '해당 상품을 정말 삭제하시겠습니까?';

export const MONEY_NAME_STRING = {
  COIN_500_WON: 'FIVE_HUNDRED_WON',
  COIN_100_WON: 'ONE_HUNDRED_WON',
  COIN_50_WON: 'FIFTY_WON',
  COIN_10_WON: 'TEN_WON',
} as const;

export const AUTH_URL_BASE = 'https://vendingmachine-auth-server.herokuapp.com';

export const POST_REQUEST_OPTIONS = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};
