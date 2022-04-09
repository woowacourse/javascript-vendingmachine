import { $ } from '../utils/dom.js';

export const SECTION_CONTAINER = $('#section-container');

export const PRODUCT = {
  MAX_LENGTH: 10,
  PRICE_UNIT: 10,
  PRICE_RANGE: {
    MIN: 100,
    MAX: 10000,
  },
  QUANTITY_RANGE: {
    MIN: 1,
    MAX: 20,
  },
};

export const COIN = {
  UNIT_LIST: [10, 50, 100, 500],
  MIN_UNIT: 10,
  MAX_AMOUNT: 100000,
};

export const CONFIRM_DELETE_MESSAGE = '상품을 삭제하시겠습니까?';

export const ERROR_MESSAGE = {
  EMPTY_NAME: '상품명을 입력해 주세요.',
  EMPTY_PRICE: '상품가격을 입력해 주세요.',
  EMPTY_QUANTITY: '상품수량을 입력해 주세요.',
  OVER_MAX_LENGTH: '상품명은 10글자 이하로 입력해 주세요.',
  NOT_DIVIDE_NUMBER: '10원 단위로 입력해 주세요.',
  OUT_OF_PRICE_RANGE: '상품 가격은 100원 이상 10000원 이하로 입력해 주세요.',
  OUT_OF_QUANTITY_RANGE: '상품 수량은 1개 이상 20개 이하로 입력해 주세요.',
  DUPLICATE_PRODUCT: '중복된 상품 입니다. 다른 상품을 입력해 주세요.',
  OVER_MAX_AMOUNT: '최대 보유 금액은 100,000원 을 넘을 수 없습니다.',
  SHORTAGE_OF_MONEY: '잔액이 부족합니다. 금액을 투입해 주세요.',
  INVALID_PASSWORD: '비밀번호는 8~16자 영어, 숫자, 특수문자를 포함하여 입력해 주세요.',
  NOT_SAME_PASSWORD: '비밀번호를 똑같이 입력해 주세요.',
};

export const SNACKBAR_MESSAGE = {
  HAVE_NO_MONEY: '반환할 금액이 없습니다.',
  RETURNED_COIN: '잔돈이 반환되었습니다.',
  LACK_COINS: '보유한 동전이 부족합니다.',
};
