export const PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  PRICE_UNIT: 10,
  MIN_STOCK: 1,
  MAX_STOCK: 20,
};

export const VENDING_MACHINE_RULES = {
  CHANGE_UNIT: 10,
  MAX_TOTAL_CHANGE: 100000,
};

export const COIN_500 = { NAME: 'FIVE_HUNDRED_WON', VALUE: 500 };
export const COIN_100 = { NAME: 'ONE_HUNDRED_WON', VALUE: 100 };
export const COIN_50 = { NAME: 'FIFTY_WON', VALUE: 50 };
export const COIN_10 = { NAME: 'TEN_WON', VALUE: 10 };

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
};

export const CONFIRM_MESSAGE = '상품을 정말 삭제하시겠습니까?';

export const ERROR = 'error';

export const SNACKBAR_MESSAGE = {
  LOGOUT_SUCCESS: '정상적으로 로그아웃되었습니다.',
  REGISTER_SUCCESS: '정상적으로 회원가입되었습니다.',
  LOGIN_SUCCESS: '정상적으로 로그인되었습니다.',
  MODIFY_MY_INFO_SUCCESS: '내 정보가 정상적으로 수정되었습니다.',

  ADD_CHANGE_SUCCESS: '잔돈이 정상적으로 충전되었습니다.',
  RETURN_CHAGNE_SUCCESS: '잔돈이 정상적으로 반환되었습니다.',

  ADD_PRODUCT_SUCCESS: '상품이 정상적으로 추가되었습니다.',
  REMOVE_PRODUCT_SUCCESS: '상품이 정상적으로 삭제되었습니다.',
  MODIFY_PRODUCT_SUCCESS: '상품이 정상적으로 수정되었습니다.',
  PURCHASE_PRODUCT_SUCCESS: '상품이 정상적으로 구매되었습니다.',

  INSERT_MONEY_SUCCESS: '금액이 정상적으로 투입되었습니다.',
};

export const SNACKBAR_DELAY_TIME = 1000;

export const STORAGE_KEY = {
  USER_ID: 'userId',
  ACCESS_TOKEN: 'accessToken',
};
