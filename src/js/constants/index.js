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
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 16,
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

  INVALID_UNIT_MONEY: `${VENDING_MACHINE_RULES.CHANGE_UNIT}원 단위로 금액을 투입해주세요`,

  INVALID_NAME_LENGTH: `이름은 최소${USER_RULES.MIN_NAME_LENGTH}이상 최대 ${USER_RULES.MAX_NAME_LENGTH}이하여야 합니다`,

  INVALID_PASSWORD: `비밀번호는 ${USER_RULES.MIN_PASSWORD_LENGTH}자 이상 ${USER_RULES.MAX_PASSWORD_LENGTH}자 이하로 대문자,소문자, 특수문자가 1번 이상 포함되어야 합니다.`,

  SOLD_OUT: '해당 상품은 품절되었습니다',

  NOT_ENOUGH_MONEY: '금액이 부족합니다.',

  NOT_SAME_PASSWORD: '비밀번호와 비밀번호 확인이 일치하지않습니다.',

  NOT_LOGIN: '로그인이 필요합니다.',

  ALREADY_LOGGINED: '이미 로그인한 상태입니다.',
};

export function confirmMessage() {
  return '정말 삭제하시겠습니까?';
}

export const LOGIN_ERROR = {
  'Incorrect password': '비밀번호를 확인해주세요',
  'Cannot find user': '해당 이메일의 사용자가 존재하지 않습니다.',
};

export const SIGNUP_ERROR = {
  'Email already exists': '해당 이메일이 존재합니다.',
};

export const SUCCESS_MESSAGE = {
  LOGIN: '로그인 성공',
  SIGNUP: '회원가입이 완료되었습니다.',
  ADD_CHANGE: '잔돈이 충전되었습니다',
  ADD_PRODUCT: '상품이 추가되었습니다.',
  UPDATE_PROUDCT: '상품이 수정되었습니다.',
  REMOVE_PRODUCT: '상품이 삭제되었습니다.',
  INPUT_MONEY: '금액이 충전되었습니다.',
  PURCHASE_PRODUCT: '상품을 구매하였습니다.',
  GIVE_CHANGE: '잔돈이 반환되었습니다.',
};

export const COOKIE_KEY = 'accessToken';
