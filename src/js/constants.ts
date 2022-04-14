const RULES = {
  MAX_PRODUCT_PRICE: 10000,
  MIN_PRODUCT_PRICE: 100,
  MAX_PRODUCT_AMOUNT: 20,
  MIN_PRODUCT_AMOUNT: 0,
  MAX_LENGTH_PRODUCT_NAME: 10,
  MINIMUM_CHANGE: 10,
  CHANGE_UNITS: [500, 100, 50, 10],
  MIN_INPUT_MONEY: 0,
  MAX_VENDING_MACHINE_CHANGE: 100000,
  MAX_USER_MONEY: 10000,
  NOT_EXIST_INDEX: -1,
};

const ERROR_MESSAGE = {
  PRODUCT_NAME_IS_DUPLICATED: '이미 존재하는 이름의 상품입니다.',
  PRODUCT_NAME_LENGTH: `상품명은 최대 ${RULES.MAX_LENGTH_PRODUCT_NAME}글자까지 입력해주세요.`,
  PRODUCT_PRICE: `상품가격은 ${RULES.MIN_PRODUCT_PRICE}원~${RULES.MAX_PRODUCT_PRICE.toLocaleString()}원 사이여야 하며 ${
    RULES.MINIMUM_CHANGE
  }원으로 나누어 떨어져야 합니다.`,
  PRODUCT_AMOUNT: `한 제품당 수량은 최대 ${RULES.MAX_PRODUCT_AMOUNT}개 입니다.`,
  TOO_MUCH_VENDING_MACHINE_CHANGE: `자판기가 보유할 수 있는 최대 금액은 ${RULES.MAX_VENDING_MACHINE_CHANGE.toLocaleString()}원 입니다.`,
  TOO_MUCH_USER_MONEY: `최대 투입 금액은 ${RULES.MAX_USER_MONEY.toLocaleString()}원 입니다.`,
  IS_NOT_UNIT_OF_TEN: `투입할 금액의 단위는 ${RULES.MINIMUM_CHANGE}원입니다.`,
  IS_NOT_POSITIVE_INTEGER: `투입할 금액은 ${RULES.MIN_INPUT_MONEY}보다 큰 금액이어야 합니다.`,
  TOO_SHORT_MONEY: '돈이 부족합니다. 구매할 금액을 더 투입해주세요.',
  SOLD_OUT_PRODUCT: '품절된 상품입니다.',
  EMPTY_PUT_MONEY: '금액을 투입해 주세요.',
  EMPTY_CHANGES: '반환할 잔돈이 없습니다.',
};

const REMOVE_CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';

const TAB_IDS = ['product-manage-button', 'change-add-button', 'product-purchase-button'];

export { RULES, ERROR_MESSAGE, REMOVE_CONFIRM_MESSAGE, TAB_IDS };
