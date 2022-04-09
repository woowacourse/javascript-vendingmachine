import { CASH, ITEM, MONEY, REGISTER } from './rule';

export const ITEM_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '빈칸 없이 모두 입력해주세요.',
  NOT_NUMBER_TYPE: '가격과 수량은 숫자로 입력해주세요.',
  ITEM_NAME_MAX_LENGTH: `상품명은 최대 ${ITEM.NAME_MAX_LENGTH}글자까지 가능합니다.`,
  ALREADY_EXIST: '이미 등록된 상품입니다. 같은 이름의 상품은 중복 등록할 수 없습니다.',
  EXCEED_PRICE_RANGE: `상품 가격은 ${ITEM.MIN_PRICE}원 이상, ${ITEM.MAX_PRICE}원 이하여야 합니다.`,
  NOT_DIVIDED_BY_UNIT: `상품 가격은 ${ITEM.PRICE_UNIT}원으로 나누어 떨어져야 합니다.`,
  EXCEED_QUANTITY_RANGE: `상품 수량은 최소 ${ITEM.MIN_QUANTITY}개부터 최대 ${ITEM.MAX_QUANTITY}개까지 넣을 수 있습니다.`,
};

export const CASH_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  LOWER_THAN_MIN_RANGE: `충전할 금액은 ${CASH.MIN}원 이상이여야 합니다.`,
  EXCEED_TOTAL_AMOUNT_RANGE: `보유할 수 있는 최소 금액은 0원, 최대 금액은 ${CASH.MAX}원입니다.`,
  NOT_DIVIDED_BY_UNIT: `잔돈은 ${CASH.UNIT}원으로 나누어 떨어져야 합니다.`,
};

export const MONEY_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  EXCEED_TOTAL_AMOUNT_RANGE: `투입할 수 있는 최소 금액은 ${MONEY.MIN}원, 최대 금액은 ${MONEY.MAX}원입니다.`,
  NOT_DIVIDED_BY_UNIT: `투입한 금액은 ${MONEY.UNIT}원으로 나누어 떨어져야 합니다.`,
};

export const PURCHASE_ERROR_MESSAGE = {
  OUT_OF_STOCK: '재고가 없습니다. 해당 상품은 더 이상 구매할 수 없습니다.',
  NOT_ENOUGH_MONEY: '잔돈이 부족합니다. 해당 상품 구매를 원하신다면 금액을 투입해 주세요.',
  NO_MONEY_LEFT: '반환할 금액이 없습니다.',
  CANNOT_GIVE_BACK_CHANGE: '반환하지 못했습니다. 자판기 관리자에게 문의해주세요.',
  CANNOT_GIVE_BACK_CHANGE_ALL: '일부만 반환되었습니다. 자판기 관리자에게 문의해주세요.',
  GIVE_BACK_CHANGE_SUCCESS: '모두 반환되었습니다.',
};

export const REGISTER_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '공백 없이 모두 입력해주세요.',
  EXCEED_NAME_RANGE: `이름은 ${REGISTER.NAME_MIN_LENGTH} ~ ${REGISTER.NAME_MAX_LENGTH} 글자로 입력해주세요.`,
  VIOLATE_PASSWORD_RULE: `비밀번호는 ${REGISTER.PASSWORD_MIN_LENGTH}글자 이상, ${REGISTER.PASSWORD_MAX_LENGTH}글자 이하이고, 숫자 영문 특수기호가 최소 한 글자 이상 포함되어야 합니다.`,
  NO_MATCH_PASSWORD_CONFIRM: '비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.',
  FAIL: '회원가입에 실패했습니다. 개발자에게 문의해주세요.',
};

export const LOGIN_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '공백 없이 모두 입력해주세요.',
  FAIL: '로그인에 실패했습니다. 개발자에게 문의해주세요.',
};

export const NOT_DEVELOPED_YET_MESSAGE = 'Coming Soon...?';
