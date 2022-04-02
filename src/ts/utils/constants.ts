const PRODUCT = {
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  UNIT: 10,
  MAX_LENGTH: 10,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
};

const CHARGE = {
  MIN_PRICE: 10,
  MAX_PRICE: 100000,
  UNIT: 10,
};

const ERROR_MESSAGES = {
  EMPTY_PRODUCT_NAME: "상품명을 입력해주세요.",
  EMPTY_PRODUCT_QUANTITY: "제품 수량을 입력해주세요.",
  EMPTY_CHARGE_AMOUNT: "충전할 금액을 입력해주세요.",
  DUPLICATED_PRODUCT_NAME: "중복된 상품이 존재합니다.",
  EXCEED_PRODUCT_LENGTH: `상품명은 최대 ${PRODUCT.MAX_LENGTH}글자까지 입력 가능합니다.`,
  INVALID_PRODUCT_PRICE_RANGE: `상품 가격은 ${PRODUCT.MIN_PRICE}원 ~ ${PRODUCT.MAX_PRICE}원 사이로 입력해주세요.`,
  INVALID_PRODUCT_PRICE_UNIT: `상품 가격은 ${PRODUCT.UNIT}원으로 나누어 떨어져야합니다.`,
  INVALID_PRODUCT_QUANTITY_RANGE: `제품당 수량은 최소 ${PRODUCT.MIN_QUANTITY}개부터 최대 ${PRODUCT.MAX_QUANTITY}개까지 가능합니다.`,
  INVALID_PRODUCT_QUANTITY_UNIT: "제품의 수량은 소수점으로 입력할 수 없습니다.",
  INVALID_CHARGE_RANGE: `최소 ${CHARGE.MIN_PRICE}원, 최대 ${CHARGE.MAX_PRICE}원까지 충전할 수 있습니다.`,
  INVALID_CHARGE_UNIT: `잔돈은 ${CHARGE.UNIT}원으로 나누어 떨어지는 금액만 투입할 수 있습니다.`,
};

const INFOMATION_MESSAGES = {
  ASK_DELETE: "정말 삭제하시겠습니까?",
};

export { PRODUCT, CHARGE, ERROR_MESSAGES, INFOMATION_MESSAGES };
