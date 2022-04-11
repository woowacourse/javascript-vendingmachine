type CoinValue = 500 | 100 | 50 | 10;

const COIN_TYPE: Array<CoinValue> = [500, 100, 50, 10].sort((a, b) => b - a) as Array<CoinValue>;

const VENDING_MACHINE_CONDITION = {
  MONEY_UNIT: 10,

  MIN_PRODUCT_NAME_LENGTH: 1,
  MAX_PRODUCT_NAME_LENGTH: 10,

  MIN_PRODUCT_PRICE: 100,
  MAX_PRODUCT_PRICE: 10000,

  MIN_PRODUCT_QUANTITY: 1,
  MAX_PRODUCT_QUANTITY: 20,

  MAX_HOLDING_AMOUNT: 100000,

  MAX_CUSTOMER_CHARGE_TO_ADD: 10000,
} as const;

const USER_INFO_CONDITION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 6,
  PASSWORD_REGEXP: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
} as const;

const ERROR_MESSAGE = {
  PRODUCT_NAME_REQUIRED: '상품명을 입력해주세요.',
  PRODUCT_NAME_LENGTH: `상품명은 ${VENDING_MACHINE_CONDITION.MIN_PRODUCT_NAME_LENGTH}자에서 ${VENDING_MACHINE_CONDITION.MAX_PRODUCT_NAME_LENGTH}자까지 입력할 수 있습니다.`,

  PRODUCT_PRICE_ONLY_NUMBER: '상품 가격은 숫자만 입력할 수 있습니다.',
  PRODUCT_PRICE_WRONG_RANGE: `상품 가격은 ${VENDING_MACHINE_CONDITION.MIN_PRODUCT_PRICE}원에서 ${VENDING_MACHINE_CONDITION.MAX_PRODUCT_PRICE}원까지 입력할 수 있습니다.`,
  PRODUCT_PRICE_WRONG_UNIT: `상품 가격은 ${VENDING_MACHINE_CONDITION.MONEY_UNIT}원 단위로 입력할 수 있습니다.`,

  PRODUCT_QUANTITY_ONLY_NUMBER: '상품 수량은 숫자만 입력할 수 있습니다.',
  PRODUCT_QUANTITY_WRONG_RANGE: `상품 수량은 ${VENDING_MACHINE_CONDITION.MIN_PRODUCT_QUANTITY}개에서 최대 ${VENDING_MACHINE_CONDITION.MAX_PRODUCT_QUANTITY}개까지만 입력할 수 있습니다.`,

  HOLDING_AMOUNT_ONLY_NUMBER: '추가할 보유 금액은 숫자만 입력할 수 있습니다.',
  HOLDING_AMOUNT_WRONG_UNIT: `추가할 자판기 보유 금액은 ${VENDING_MACHINE_CONDITION.MONEY_UNIT}원 단위로 입력할 수 있습니다.`,
  HOLDING_AMOUNT_WRONG_LIMIT: `자판기 보유 금액은 ${VENDING_MACHINE_CONDITION.MAX_HOLDING_AMOUNT}원까지 충전할 수 있습니다.`,

  CUSTOMER_CHARGE_ONLY_NUMBER: '상품 구매 금액은 숫자만 입력할 수 있습니다.',
  CUSTOMER_CHARGE_WRONG_UNIT: `상품 구매 금액은 ${VENDING_MACHINE_CONDITION.MONEY_UNIT}원 단위로 입력할 수 있습니다.`,
  CUSTOMER_CHARGE_WRONG_LIMIT: `상품 구매 금액은 한 번에 ${VENDING_MACHINE_CONDITION.MAX_CUSTOMER_CHARGE_TO_ADD}원까지 충전할 수 있습니다.`,

  USER_NAME_LENGTH: `이름은 ${USER_INFO_CONDITION.MIN_NAME_LENGTH}자에서 ${USER_INFO_CONDITION.MAX_NAME_LENGTH}자까지 입력할 수 있습니다.`,
  PASSWORD_CONFIRM: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  PASSWORD_CONDITION: '비밀번호는 숫자, 소문자 알파벳, 대문자 알파벳 각각 1자 이상을 포함하여 전체 8자 이상이어야 합니다.',

  FAIL_TO_READ_AUTH_INFO: '저장된 Auth 정보를 불러오는데 실패했습니다.',
} as const;

const GUIDE_MESSAGE = {
  PRODUCT_UPDATE_CONFIRM: '이미 존재하는 상품입니다.\n기존 상품 목록에서 덮어씌우시겠습니까?',
  ONE_PRODUCT_UPDATE_AT_ONCE: '한 번에 하나의 상품만 수정 가능합니다.',
  PRODUCT_DELETE_CONFIRM: '정말 해당 상품을 삭제하시겠습니까?',

  CUSTOMER_CHARGE_SUCCESS: '상품 구매 금액 충전 성공! 😆',
  PURCHASE_SUCCESS: (productName) => `${productName} 구입 성공! 😆`,
  INSUFFICIENT_CHARGE_TO_PURCHASE: '돈이 부족해요! 😥',

  RETURN_CHANGES_SUCCESS: '잔돈 반환 성공! 😆',
  RETURN_INSUFFICIENT_CHANGES: '미안해요. 잔돈이 부족해서 다 돌려줄 수가 없어요. 😥',

  SIGNUP_SUCCESS: '회원가입 성공! 😄',
  SIGNUP_EMAIL_ALREADY_EXISTS: '이미 가입한 이메일입니다.',

  LOGIN_SUCCESS: '로그인 성공! 😄',
  LOGIN_CANNOT_FIND_USER: '등록되지 않은 이메일입니다.',
  LOGIN_INCORRECT_PASSWORD: '잘못된 비밀번호입니다.',

  UPDATE_USER_INFO_SUCCESS: '회원 정보 업데이트 성공! 😄',
} as const;

export {
  COIN_TYPE,

  VENDING_MACHINE_CONDITION,
  USER_INFO_CONDITION,

  ERROR_MESSAGE,
  GUIDE_MESSAGE,
};
