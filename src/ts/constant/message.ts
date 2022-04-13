export const ITEM_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '빈칸 없이 모두 입력해주세요.',
  NOT_NUMBER_TYPE: '가격과 수량은 숫자로 입력해주세요.',
  ITEM_NAME_MAX_LENGTH: '상품명은 최대 10글자까지 가능합니다.',
  ALREADY_EXIST: '이미 등록된 상품입니다.',
  EXCEED_PRICE_RANGE: '상품 가격은 100원 이상, 10,000원 이하여야 합니다.',
  NOT_DIVIDED_BY_PRICE_UNIT: '상품 가격은 10원으로 나누어떨어져야 합니다.',
  EXCEED_QUANTITY_RANGE: '상품 수량은 최소 1개부터 최대 20개까지 넣을 수 있습니다.',
  NOT_DIVIDED_BY_QUANTITY_UNIT: '상품 수량은 1개로 나누어떨어져야 합니다.',
};

export const CASH_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  LOWER_THAN_MIN_RANGE: '충전할 금액은 10원 이상이여야 합니다.',
  EXCEED_TOTAL_AMOUNT_RANGE: '보유할 수 있는 최소 금액은 0원, 최대 금액은 100,000원입니다.',
  NOT_DIVIDED_BY_UNIT: '잔돈은 10원으로 나누어 떨어져야 합니다.',
};

export const ITEM_PURCHASE_CASH_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  EXCEED_CASH_RANGE: '충전할 금액은 10원 이상 10,000원 이하로 입력해주세요.',
  NOT_DIVIDED_BY_UNIT: '충전할 금액은 10원으로 나누어 떨어져야 합니다.',
  LACK_MONEY: '금액이 부족합니다. 금액을 더 충전해주세요.',
};

export const COIN_RETURN_ERROR_MESSAGE = {
  NO_CASH: '충전된 금액이 없습니다. 금액을 충전해주세요.',
  NO_RETURN_COIN: '반환할 수 있는 동전이 없습니다.',
};

export const AUTHENTICATION_MESSAGE = {
  NOT_EMAIL_FORMAT: '이메일 형식에 맞지 않습니다.',
  EXCEED_NAME_LENGTH_RANGE: '이름은 2글자 이상 6글자 이하로 작성해 주세요.',
  EXCEED_PASSWORD_LENGTH_RANGE: '비밀번호는 8글자 이상 16글자 이하로 작성해 주세요.',
  NOT_PASSWORD_FORMAT: `비밀번호 형식에 맞지 않습니다.\n비밀번호는 비밀번호는 영문, 숫자, 특수문자(! # $ % & ( ) * + , - . / : ; < = > ? @)의 조합으로 작성해주세요`,
  DIFFERENT_VERIFICATION_PASSWORD:
    '비밀번호와 비밀번호 확인이 일치하지 않습니다.\n비밀번호 확인을 다시 입력해주세요.',
};

export const REGISTER_SUCCESS_MESSAGE = '회원가입에 성공했습니다. 로그인을 해주세요.';

export const LOGIN_SUCCESS_MESSAGE = '로그인에 성공했습니다.';

export const LOGOUT_MESSAGE = '로그아웃하였습니다.';
