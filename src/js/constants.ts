const PATH_NAME = {
  PRODUCT_MANAGE: '#!/product-manage',
  ADD_CHANGE: '#!/change-add',
  PRODUCT_PURCHASE: '#!/product-purchase',
};

const RULES = {
  MAX_PRODUCT_PRICE: 10000,
  MIN_PRODUCT_PRICE: 100,
  MAX_PRODUCT_AMOUNT: 20,
  MIN_PRODUCT_AMOUNT: 0,
  MINIMUM_CHANGE: 10,
  MAX_LENGTH_PRODUCT_NAME: 10,
  MAX_VENDING_MACHINE_CHANGE: 100000,
  MAX_VENDING_MACHINE_INPUT_MONEY: 10000,
  NOT_EXIST_INDEX: -1,
};

const ERROR_MESSAGE = {
  PRODUCT_NAME_IS_DUPLICATED: '이미 존재하는 이름의 상품입니다.',
  PRODUCT_NAME_LENGTH: '상품명은 최대 10글자까지 입력해주세요.',
  PRODUCT_PRICE: '상품가격은 100원~10,000원 사이여야 하며 10원으로 나누어 떨어져야 합니다.',
  PRODUCT_AMOUNT: '한 제품당 수량은 최대 20개 입니다.',
  TOO_MUCH_VENDING_MACHINE_CHANGE: '자판기가 보유할 수 있는 최대 금액은 100,000원 입니다.',
  TOO_MUCH_VENDING_MACHINE_INPUT_MONEY: '자판기에 투입할 수 있는 최대 금액은 10,000원 입니다.',
  IS_NOT_UNIT_OF_TEN: '투입할 금액의 단위는 10원입니다.',
  IS_NOT_POSITIVE_INTEGER: '투입할 금액은 0보다 큰 금액이어야 합니다.',
  NOT_ENOUGH_RETURN_CHANGE: '자판기에 더 이상 반환할 수 없는 잔돈이 없습니다.',
  NOT_ENOUGH_MONEY: '투입된 금액이 부족합니다.',
};

const REMOVE_CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';

export { PATH_NAME, RULES, ERROR_MESSAGE, REMOVE_CONFIRM_MESSAGE };
