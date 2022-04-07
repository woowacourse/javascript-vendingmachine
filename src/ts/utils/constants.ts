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

const PURCAHSE = {
  MIN_AMOUNT: 10,
  MAX_AMOUNT: 10000,
  UNIT: 10,
};

const USER_NAME = {
  MAX_LENGTH: 6,
  MIN_LENGTH: 2,
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
  INVALID_PURCHASE_AMOUNT_RANGE: `투입 금액은 ${PURCAHSE.MIN_AMOUNT}원 ~ ${PURCAHSE.MAX_AMOUNT}원 사이로 입력해주세요.`,
  INVALID_PURCHASE_AMOUNT_UNIT: `투입 금액은 ${PURCAHSE.UNIT}원으로 나누어 떨어져야합니다.`,
  NOT_ENOUGH_PURCHASE_STOCK: "해당 상품의 재고가 모두 소진되었습니다.",
  NOT_ENOUGH_PURCHASE_AMOUNT: "상품을 구매할 금액이 부족합니다. 금액을 더 충전해주세요.",
  NOT_ENOUGH_RETURN_COIN: "반환 가능한 동전이 모두 소진되었습니다. 관리자에게 문의하세요.",
  NOT_ENOUGH_INPUT_AMOUNT: "투입한 금액이 없어서 반환할 수 없습니다.",
  CANNOT_PARSE_JSON: "저장된 데이터가 유효하지 않은 JSON 형식입니다.",
  FAIL_SIGNUP: "회원가입이 실패하였습니다.",
  FAIL_LOGIN: "로그인이 실패하였습니다.",
  FAIL_EDIT_PROFILE: "회원 정보 수정이 실패하였습니다.",
  INVALID_USER_NAME_LENGTH: `유저 이름은 ${USER_NAME.MIN_LENGTH}~${USER_NAME.MAX_LENGTH}자 사이로 입력해주세요.`,
  NOT_MATCH_PASSWORD: "비밀번호가 일치하지 않습니다.",
  INVALID_PASSWORD_RULE: `비밀번호는 8~16자 영문, 숫자, 특수문자를 최소 한가지 포함해야합니다.`,
};

const INFOMATION_MESSAGES = {
  ASK_DELETE: "정말 삭제하시겠습니까?",
  SUCCESS_CHARGE: "금액 충전이 완료되었습니다.",
  SUCCESS_ADD_PRODUCT: "상품이 추가되었습니다.",
  SUCCESS_DELETE_PRODUCT: "상품이 삭제되었습니다.",
  SUCCESS_EDIT_PRODUCT: "상품 수정이 완료되었습니다.",
  SUCCESS_PURCHASE_PRODUCT: "상품을 구매하였습니다.",
  SUCCESS_RETURN_COIN: "동전이 반환되었습니다.",
  SUCCESS_SIGNUP: "회원가입 완료! 로그인되었습니다.",
  SUCCESS_LOGIN: "로그인되었습니다.",
};

export { PRODUCT, CHARGE, PURCAHSE, USER_NAME, ERROR_MESSAGES, INFOMATION_MESSAGES };
