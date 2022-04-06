export const PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  PRICE_UNIT: 10,
  MAX_STOCK: 20,
  MIN_STOCK: 1,
};

export const VENDING_MACHINE_RULES = {
  CHANGE_UNIT: 10,
  MAX_TOTAL_CHANGE: 100000,
  MAX_TOTAL_INPUT_MONEY: 10000,
};

export const USER_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 6,
};
export const ERROR_MESSAGE = {
  CONTAIN_EMPTY_FIELD_IN_FORM: '상품명, 가격, 수량을 모두 입력해주세요.',

  EXCEED_MAX_PRODUCT_NAME_LENGTH: `상품명은 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자를 초과해서는 안됩니다.`,
  DUPLICATE_PRODUCT_NAME: '중복된 상품명의 상품은 등록할 수 없습니다.',

  OUT_OF_PRODUCT_PRICE_RANGE: `상품 가격은 ${PRODUCT_RULES.MIN_PRICE}원 미만이거나 ${PRODUCT_RULES.MAX_PRICE}원 초과할 수 없습니다.`,
  INVALID_UNIT_PRODUCT_PRICE: `상품 가격은 ${PRODUCT_RULES.PRICE_UNIT}원 단위여야 합니다.`,

  INVALID_PRODUCT_STOCK: '올바른 수량을 입력해주세요',
  OUT_OF_PRODUCT_STOCK_RANGE: `상품 수량은 ${PRODUCT_RULES.MIN_STOCK}개 미만이거나 ${PRODUCT_RULES.MAX_STOCK}개 초과할 수 없습니다.`,

  NOT_FOUND_PRODUCT_ID: '존재하지 않는 상품 아이디입니다.',

  BELOW_MIN_CHANGE: '충전 금액은 0원 이하일 수 없습니다.',
  INVALID_UNIT_CHANGE: `충전 금액은 ${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위이어야 합니다.`,
  EXCEED_MAX_TOTAL_CHANGE: `최대 보유 금액은 ${VENDING_MACHINE_RULES.MAX_TOTAL_CHANGE}원을 초과할 수 없습니다.`,

  EXCEED_MAX_TOTAL_MONEY: `최대 충전 금액은 ${VENDING_MACHINE_RULES.MAX_TOTAL_INPUT_MONEY}원을 초과할 수 없습니다.`,

  INVALID_NAME_LENGTH: `이름은 최소${USER_RULES.MIN_NAME_LENGTH}이상 최대 ${USER_RULES.MAX_NAME_LENGTH}이하여야 합니다`,
};

export function confirmMessage() {
  return '정말 삭제하시겠습니까?';
}
