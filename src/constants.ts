export const API_URL = 'https://vending-maching-auth-api.herokuapp.com';

export const ACCESS_TOKEN_KEY = 'vending-machine-token-key';

export const USER_INFO_KEY = 'vending-machine-user-info-key';

export const PRODUCT_LIST_KEY = 'vending-machine-product-list-key';

export const CHARGED_COIN_KEY = 'vending-machine-charged-coin-key';

export const INSERTED_MONEY_KEY = 'vending-maching-inserted-money-key';

export const COIN = {
  MIN_UNIT: 10,
  UNITS: [500, 100, 50, 10],
};

export const PRODUCT = {
  NAME: {
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

export const MONEY = {
  MAX: 100000,
};

export const INSERT_MONEY = {
  MAX: 10000,
};

export const NAME = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 6,
};

export const PASSWORD = {
  MIN_LENGTH: 8,
  MAX_REPEAT: 2,
  MAX_CONSECUTIVE_NUMBER: 3,
};

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
  INSERT_MONEY: 'insert-money',
  PURCHASE_PRODUCT: 'purchase-product',
  RELEASE_COIN: 'release-coin',
};

export const VALIDATION_ERROR_NAME = 'validation-error';

export const ERROR_MESSAGE: { [k in string]: string } = {
  EMPTY_PRODUCT_NAME: '상품명을 입력해 주세요',
  OVER_MAX_LENGTH_PRODUCT_NAME: `상품명은 ${PRODUCT.NAME.MAX_LENGTH}글자 이내이어야 합니다`,
  DUPLICATE_PRDUCT_NAME: '이미 등록된 상품입니다',

  EMPTY_PRODUCT_PRICE: '상품 가격을 입력해 주세요',
  NOT_NUMBER_PRODUCT_PRICE: '상품 가격은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_PRICE: `상품 가격은 ${PRODUCT.PRICE.MIN.toLocaleString(
    'ko-kr'
  )}원 ~ ${PRODUCT.PRICE.MAX.toLocaleString('ko-kr')}원 이내이어야 합니다`,
  NOT_DIVIDED_BY_TEN_PRODUCT_PRICE: `상품 가격은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,

  EMPTY_PRODUCT_QUANTITY: '상품 수량을 입력해 주세요',
  NOT_NUMBER_QUANTITY: '상품 수량은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_QUANTITY: `상품 수량은 ${PRODUCT.QUANTITY.MIN.toLocaleString(
    'ko-kr'
  )}개 ~ ${PRODUCT.QUANTITY.MAX.toLocaleString('ko-kr')}개 이내이어야 합니다`,

  EMPTY_CHARGE_MONEY: '충전 금액을 입력해주세요.',
  NOT_NUMBER_CHARGE_MONEY: '충전 금액은 숫자이어야 합니다',
  NEGATIVE_CHARGE_MONEY: '충전 금액은 양수이어야 합니다.',
  NOT_DIVIDED_BY_TEN_CHARGE_MONEY: `충전 금액은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,
  OVER_MAX_CHARGE_MONEY: `잔돈으로 보유할 수 있는 최대 금액은 ${MONEY.MAX.toLocaleString(
    'ko-kr'
  )}원입니다.`,

  EMPTY_INSERT_MONEY: '충전 금액을 입력해주세요.',
  NOT_NUMBER_INSERT_MONEY: '충전 금액은 숫자이어야 합니다',
  NEGATIVE_INSERT_MONEY: '충전 금액은 양수이어야 합니다.',
  NOT_DIVIDED_BY_TEN_INSERT_MONEY: `충전 금액은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,
  OVER_MAX_INSERT_MONEY: `최대 투입 금액은 ${INSERT_MONEY.MAX.toLocaleString('ko-kr')}원입니다.`,

  NO_STOCK: '재고가 없습니다',
  NOT_ENOUGH_MONEY: '금액이 부족합니다',

  EMPTY_EMAIL: '이메일을 입력해 주세요',
  INVALID_FORMAT_EMAIL: '올바른 이메일 양식을 입력해 주세요',

  EMPTY_NAME: '이름을 입력해 주세요',
  INVALID_LENGTH_NAME: `이름은 ${NAME.MIN_LENGTH} ~ ${NAME.MAX_LENGTH}글자 까지만 가능합니다`,

  EMPTY_PASSWORD: '비밀번호를 입력해 주세요',
  INVALID_LENGTH_PASSWORD: `비밀번호는 ${PASSWORD.MIN_LENGTH}자 이상이어야 합니다`,
  NOT_HAS_LETTER_PASSWORD: '비밀번호는 최소 하나 이상의 문자열을 포함해야 합니다',
  NOT_HAS_NUMBER_PASSWORD: '비밀번호는 최소 하나 이상의 숫자를 포함해야 합니다',
  NOT_HAS_SPECIAL_CHARACTER_PASSWORD: '비밀번호는 최소 하나이상의 특수문자를 포함해야 합니다',
  NOT_HAS_UPPERCASE_PASSWORD: '비밀번호는 최소 하나 이상의 대문자를 포함해야 합니다',
  REPEAT_LETTER_PASSWORD: `같은 문자를 ${PASSWORD.MAX_REPEAT}번 반복하면 안됩니다`,
  CONSECUTIVE_NUMBER_PASSWORD: `연속된 숫자가 ${PASSWORD.MAX_CONSECUTIVE_NUMBER}개를 초과하면 안됩니다`,
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다',
};
