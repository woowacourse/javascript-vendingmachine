import { addThousandUnitComma } from './utils';

export const BASE_HASH = '#!product-purchase';

export const HEADER = {
  VENDING_MACHINE: '🍿 자판기 🍿',
  LOGIN: '로그인',
  SIGNUP: '회원가입',
  USER_INFO_MODIFY: '회원 정보 수정',
};

export const COIN = {
  DEFAULT_COUNT: 0,
};

export const MONEY = {
  DEFAULT: 0,
  MACHINE_MAX: 100000,
  CUSTOMER_MAX: 10000,
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

export const CONFIRM_MESSAGE = {
  DELETE: '선택한 상품을 정말 삭제하시겠습니까? 한번 삭제한 상품은 복구할 수 없습니다.',
};

export const ERROR_MESSAGE = {
  VENDING_MACHINE: {
    IS_BLANK_PRODUCT_NAME: '공백으로만 이루어진 상품명이 입력되었습니다! 상품명을 입력해 주세요!',
    IS_OVER_MAX_PRODUCT_NAME_LENGTH: `상품명이 최대 길이인 ${PRODUCT.NAME.MAX_LENGTH}자를 초과하여 입력되었습니다! ${PRODUCT.NAME.MAX_LENGTH}자 이내로 입력해 주세요!`,
    IS_ALREADY_EXIST_PRODUCT_WHEN_ADD:
      '이미 존재하는 상품입니다! 가격 또는 수량을 수정하고 싶으시다면 수정 버튼을 클릭해 주세요!',
    IS_ALREADY_EXIST_PRODUCT_WHEN_MODIFY: '이미 존재하는 상품입니다! 다른 상품명을 입력해 주세요!',

    IS_NOT_INTEGER_PRICE: '가격에 정수가 입력되지 않았습니다! 정수를 입력해 주세요!',
    IS_UNDER_MIN_PRICE: `가격이 최소 가격인 ${PRODUCT.PRICE.MIN}원 미만으로 입력되었습니다! ${PRODUCT.PRICE.MIN}원 이상으로 입력해 주세요!`,
    IS_OVER_MAX_PRICE: `가격이 최대 가격인 ${addThousandUnitComma(
      PRODUCT.PRICE.MAX,
    )}원을 초과하여 입력되었습니다! ${PRODUCT.PRICE.MAX.toLocaleString()}원 이하로 입력해 주세요!`,
    PRICE_CANNOT_DIVIDED_BY_TEN: '가격에 1원 단위가 입력되었습니다! 10원 단위로 입력해 주세요!',

    IS_NOT_INTEGER_QUANTITY: '수량에 정수가 입력되지 않았습니다! 정수를 입력해 주세요!',
    IS_UNDER_MIN_QUANTITY: `수량이 최소 수량인 ${PRODUCT.QUANTITY.MIN}개 미만으로 입력되었습니다! ${PRODUCT.QUANTITY.MIN}개 이상으로 입력해 주세요!`,
    IS_OVER_MAX_QUANTITY: `수량이 최대 수량인 ${PRODUCT.QUANTITY.MAX}개를 초과하여 입력되었습니다! ${PRODUCT.QUANTITY.MAX}개 이하로 입력해 주세요!`,

    IS_OVER_MAX_MACHINE_MONEY: `현재 보유 금액이 최대 보유 가능 금액인 ${addThousandUnitComma(
      MONEY.MACHINE_MAX,
    )}원을 초과하였습니다! 현재 보유 금액을 확인한 후 입력해 주세요!`,
    IS_OVER_MAX_CUSTOMER_MONEY: `투입한 금액이 최대 투입 가능 금액인 ${addThousandUnitComma(
      MONEY.CUSTOMER_MAX,
    )}원을 초과하였습니다! 투입한 금액을 확인한 후 입력해 주세요!`,
    MONEY_CANNOT_DIVIDED_BY_TEN: '금액에 1원 단위가 입력되었습니다! 10원 단위로 입력해 주세요!',

    IS_PRICE_OVER_CUSTOMER_MONEY: '투입한 금액이 부족합니다! 해당 상품을 구매하시려면 금액을 더 투입해 주세요!',
    IS_SOLD_OUT: '품절된 상품입니다! 다른 상품을 구매해 주세요!',

    IS_NO_CUSTOMER_MONEY: '투입한 금액이 없습니다! 10원부터 잔돈으로 반환할 수 있습니다!',
  },
  AUTH: {
    CANNOT_FIND_USER: '가입되지 않은 이메일입니다! 이메일을 확인해 주세요!',
    INCORRECT_PASSWORD: '비밀번호가 틀렸습니다! 비밀번호를 다시 입력해 주세요!',
  },
};

export const JSON_AUTH_SERVER_ERROR_MESSAGE = {
  CANNOT_FIND_USER: 'Cannot find user',
  INCORRECT_PASSWORD: 'Incorrect password',
};
