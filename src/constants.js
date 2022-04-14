export const COIN = {
  DEFAULT_COUNT: 0,
};

export const MONEY = {
  DEFAULT: 0,
  MAX: 100000,
};

export const PRODUCT = {
  NAME: {
    MAX_LENGTH: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 10000,
    PURCHASE_INPUT_MAX: 100000,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 20,
  },
};

export const CONFIRM_MESSAGE = {
  DELETE: '선택한 상품을 정말 삭제하시겠습니까? 한번 삭제한 상품은 복구할 수 없습니다.',
};

export const ERROR_MESSAGE = {
  IS_BLANK_PRODUCT_NAME: '공백으로만 이루어진 상품명이 입력되었습니다! 상품명을 입력해 주세요!',
  IS_OVER_MAX_PRODUCT_NAME_LENGTH: `상품명이 최대 길이인 ${PRODUCT.NAME.MAX_LENGTH}자를 초과하여 입력되었습니다! ${PRODUCT.NAME.MAX_LENGTH}자 이내로 입력해 주세요!`,
  IS_ALREADY_EXIST_PRODUCT_WHEN_ADD:
    '이미 존재하는 상품입니다! 가격 또는 수량을 수정하고 싶으시다면 수정 버튼을 클릭해 주세요!',
  IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY: '이미 존재하는 상품입니다! 다른 상품명을 입력해 주세요!',

  IS_NOT_INTEGER_PRICE: '가격에 정수가 입력되지 않았습니다! 정수를 입력해 주세요!',
  IS_UNDER_MIN_PRICE: `가격이 최소 가격인 ${PRODUCT.PRICE.MIN}원 미만으로 입력되었습니다! ${PRODUCT.PRICE.MIN}원 이상으로 입력해 주세요!`,
  IS_OVER_MAX_PRICE: `가격이 최대 가격인 ${PRODUCT.PRICE.MAX.toLocaleString()}원을 초과하여 입력되었습니다! ${PRODUCT.PRICE.MAX.toLocaleString()}원 이하로 입력해 주세요!`,
  PRICE_CANNOT_DIVIDED_BY_TEN: '가격에 1원 단위가 입력되었습니다! 10원 단위로 입력해 주세요!',

  IS_NOT_INTEGER_QUANTITY: '수량에 정수가 입력되지 않았습니다! 정수를 입력해 주세요!',
  IS_UNDER_MIN_QUANTITY: `수량이 최소 수량인 ${PRODUCT.QUANTITY.MIN}개 미만으로 입력되었습니다! ${PRODUCT.QUANTITY.MIN}개 이상으로 입력해 주세요!`,
  IS_OVER_MAX_QUANTITY: `수량이 최대 수량인 ${PRODUCT.QUANTITY.MAX}개를 초과하여 입력되었습니다! ${PRODUCT.QUANTITY.MAX}개 이하로 입력해 주세요!`,

  MONEY_CANNOT_DIVIDED_BY_TEN: '금액에 1원 단위가 입력되었습니다! 10원 단위로 입력해 주세요!',
  IS_OVER_MAX_MONEY: `현재 보유 금액이 최대 보유 가능 금액인 ${MONEY.MAX.toLocaleString()}원을 초과하였습니다! 현재 보유 금액을 확인한 후 입력해 주세요!`,

  IS_UNDER_PRODUCT_MIN_PRICE: `최소 상품 가격인 ${PRODUCT.PRICE.MIN}원 미만으로 입력되었습니다! 상품을 구매하고 싶으시면, ${PRODUCT.PRICE.MIN}원 이상으로 입력해 주세요!`,
  IS_OVER_PRODUCT_MAX_PRICE: `돈은 한번에 최대 ${PRODUCT.PRICE.PURCHASE_INPUT_MAX.toLocaleString()}만큼 투입할 수 있습니다! ${PRODUCT.PRICE.PURCHASE_INPUT_MAX.toLocaleString()}원 이하로 투입해주세요!`,

  IS_OVER_MONEY_INPUT: `상품의 가격이 투입된 돈보다 더 비쌉니다. 상품을 구매하고 싶으시면, 돈을 더 투입해주세요.`,

  IS_NOT_CORRECTED_PASSWORD:
    '비밀번호를 잘못 입력했습니다. 비밀번호는 최소 10자리 이상이며, 영어 대문자, 소문자, 숫자 중 최소 2종류를 조합해야합니다.',
  IS_NOT_MATCHED_PASSWORD: '비밀번호가 다릅니다. 비밀번호를 다시 확인하세요.',
};

export const SUCCESS = {
  PRODUCT_MODIFY: '상품 정보가 정상적으로 수정되었습니다.',
  PRODUCT_DELETE: '상품 정보가 정상적으로 삭제되었습니다.',
  PRODUCT_ADD: '상품을 정상적으로 추가했습니다.',
  COIN_CHARGE: '자판기의 잔돈이 정상적으로 충전되었습니다.',
  PURCHASE_MONEY_INPUT: '금액이 정상적으로 투입되었습니다. 이제 상품을 구매할 수 있습니다.',
  RETURN_CHANGE: '잔돈이 정상적으로 반환되었습니다.',
  SIGNUP: '회원가입이 정상적으로 완료되었습니다.',
  LOGIN: '로그인이 정상적으로 완료되었습니다.',
  LOGOUT: '로그아웃이 정상적으로 완료되었습니다.',
  MODIFY: '회원 정보 수정이 정상적으로 완료되었습니다.',
};

export const PASSWORD = {
  MIN_LENGTH: 10,
  MIN_COMBINATION_COUNT: 2,
};

export const AUTH = {
  EMAIL_ALREADY_EXISTS: '이미 존재하는 이메일입니다. 이메일을 다시 확인해주세요.',
  CANNOT_FIND_USER: '해당 이메일로 가입된 계정이 없습니다. 이메일을 다시 확인해주세요.',
  INCORRECT_PASSWORD: '잘못된 비밀번호입니다. 비밀번호를 다시 확인해주세요.',
  PASSWORD_IS_TOO_SHORT: '비밀번호가 너무 짧습니다. 비밀번호는 최소 10자리 이상입니다.',
};
