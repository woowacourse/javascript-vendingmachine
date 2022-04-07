export const TAB_ID = {
  PRODUCT_MANAGE: '/#!/product-manage',
  RECHARGE: '/#!/recharge',
  PURCHASE_PRODUCT: '/#!/purchase-product',
};

export const PAGE_ID = {
  LOGIN: '/#!/login',
  REGISTER: '/#!/register',
  USERINFO_EDIT: '/#!/user-info-edit',
};

export const ERROR_MESSAGE = {
  NAME_EMPTY: '상품명은 최소 한 글자 이상이어야 합니다.',
  NAME_LENGTH: '상품명은 최대 10글자까지 가능합니다. 상품명을 10글자 이하로 입력해주세요.',
  PRICE_RANGE: '상품 가격은 100원부터 시작하며, 최대 10,000원까지 가능합니다.',
  PRICE_UNIT: '상품 가격은 10의 배수여야 합니다.',
  EXCEED_QUANTITY: '상품의 수량은 최대 20개 입니다.',
  DUPLICATED_PRODUCT: '현재 상품은 이미 자판기에 있습니다. 중복되지 않는 상품명을 입력해주세요.',
  RECHARGE_MONEY_UNIT: '충전할 금액은 10의 배수여야 합니다.',
  EXCEED_HOLDING_MONEY: '보유할 수 있는 최대 금액은 10만원입니다.',
  UNDER_MIN_RECHARGING_MONEY: '충전할 금액은 10원 이상이어야 합니다.',
  NOT_INTEGER: '정수를 입력하셔야 합니다.',
  MONTY_UNIT: '금액은 10의 배수여야 합니다.',
  EXCEED_PURCHASE_MONEY: '구입할 금액 투입은 최대 10,000원 입니다.',
  UNDER_MIN_PURCHASE_MONEY: '구입할 금액 투입은 10원 이상이어야 합니다.',
  NOT_ENOUGH_MONEY: '투입한 금액이 부족합니다.',
  NOT_ENOUGH_RECHARGE: '자판기가 보유한 동전이 없습니다.',
  REGISTER_ERROR: '이미 가입된 이메일입니다.',
  USER_NAME_LENGTH: '이름은 2 ~ 6자로 입력해야 합니다.',
  USER_PASSWORD_LENGTH: '비밀번호는 4 ~ 10자로 입력해야 합니다.',
  PASSWORD_CHECK: '비밀번호 확인이 입력한 비밀번호와 일치하지 않습니다.',
};

export const SUCCESS_MESSAGE = {
  ADD_PRODUCT: '상품을 성공적으로 추가했습니다.',
  EDIT_PRODUCT: '상품을 성공적으로 수정했습니다.',
  DELETE_PRODUCT: '상품을 성공적으로 삭제했습니다.',
  RECHARGE_MONEY: '잔돈을 성공적으로 충전했습니다.',
  ADD_PURCHASE_MONEY: '성공적으로 투입했습니다.',
  PURCHASE_PRODUCT: '상품을 성공적으로 구매했습니다.',
  RETURN_COIN: '잔돈을 성공적으로 반환했습니다.',
  REGISTER: '회원가입을 성공적으로 완료했습니다.',
};

export const CONFIRM_MESSAGE = {
  DELETE: '정말 삭제하시겠습니까?',
};

export const VENDING_MACHINE_RULE = {
  MAX_QUANTITY: 20,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  MAX_NAME_LENGTH: 10,
  UNIT: 10,
  MAX_HOLDING_MONEY: 100000,
  MIN_RECHARGING_MONEY: 10,
  MAX_PURCHASE_MONEY: 10000,
  MIN_PURCHASE_MONEY: 10,
};

export const USER_RULE = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 6,
};

export const STORAGE_ID = {
  MONEY: 'money',
  PRODUCTS: 'products',
  CURRENT_VIEW: 'current-view',
  PURCHASE_MONEY: 'purchase-money',
};

export const COIN = {
  VALUE_500: 500,
  VALUE_100: 100,
  VALUE_50: 50,
  VALUE_10: 10,
};

export const FLAG = {
  POP_STATE: true,
};

export const SERVER_ENTRY = 'http://localhost:3000';

export const API_QUERY = {
  REGISTER: '/register',
};
