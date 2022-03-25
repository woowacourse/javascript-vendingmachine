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

export const COIN_UNITS = [500, 100, 50, 10];

export const COIN_UNIT = 10;

export const CONFIRM_DELETE_MESSAGE = '상품을 삭제하시겠습니까?';

export const ERROR_MESSAGE = {
  EMPTY_NAME: '상품명을 입력해 주세요.',
  EMPTY_PRICE: '상품가격을 입력해 주세요.',
  EMPTY_QUANTITY: '상품수량을 입력해 주세요.',
  OVER_MAX_LENGTH: '상품명은 10글자 이하로 입력해 주세요.',
  NOT_DIVIDE_NUMBER: '10원 단위로 입력해 주세요.',
  OUT_OF_PRICE_RANGE: '상품 가격은 100원 이상 10000원 이하로 입력해 주세요.',
  OUT_OF_QUANTITY_RANGE: '상품 수량은 1개 이상 20개 이하로 입력해 주세요.',
};
