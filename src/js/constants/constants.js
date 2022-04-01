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
  UNIT_LIST: [500, 100, 50, 10],
  MIN_UNIT: 10,
  MAX_AMOUNT: 100000,
};

export const CONFIRM_DELETE_MESSAGE = '상품을 삭제하시겠습니까?';

export const ERROR_MESSAGE = {
  EMPTY_NAME: '상품명을 입력해 주세요.',
  EMPTY_PRICE: '상품가격을 입력해 주세요.',
  EMPTY_QUANTITY: '상품수량을 입력해 주세요.',
  OVER_MAX_LENGTH: `상품명은 ${PRODUCT.MAX_LENGTH}글자 이하로 입력해 주세요.`,
  NOT_DIVIDE_NUMBER: `${COIN.MIN_UNIT}원 단위로 입력해 주세요.`,
  OUT_OF_PRICE_RANGE: `상품 가격은 ${PRODUCT.PRICE_RANGE.MIN}원 이상 ${PRODUCT.PRICE_RANGE.MAX}원 이하로 입력해 주세요.`,
  OUT_OF_QUANTITY_RANGE: `상품 수량은 ${PRODUCT.QUANTITY_RANGE.MIN}개 이상 ${PRODUCT.QUANTITY_RANGE.MAX}개 이하로 입력해 주세요.`,
  DUPLICATE_PRODUCT: '중복된 상품 입니다. 다른 상품을 입력해 주세요.',
  OVER_MAX_AMOUNT: `최대 보유 금액은 ${COIN.MAX_AMOUNT}원 을 넘을 수 없습니다.`,
  OVER_USER_AMOUNT: `투입 금액이 부족하여 선택한 상품을 구매할 수 없습니다`,
};

export const SNACKBAR_MESSAGE = {
  ADD_PRODUCT: '상품을 추가했습니다.',
  MODIFY_PRODUCT: '상품 정보를 수정했습니다.',
  DELETE_PRODUCT: '상품을 삭제했습니다.',
  CHARGE_AMOUNT: `잔돈을 충전했습니다.`,
  CHARGE_USER_AMOUNT: '금액을 투입했습니다.',
  PURCHASE_PRODUCT: '상품을 구매했습니다.',
  RETURN_AMOUNT: '남은 금액을 반환했습니다.',
};
