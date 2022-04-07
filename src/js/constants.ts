const PATH_NAME = {
  PRODUCT_MANAGE: '#!/product-manage',
  ADD_CHANGE: '#!/change-add',
  PRODUCT_PURCHASE: '#!/product-purchase',
  LOGIN: '#!/login',
  LOGOUT: '#!/logout',
  REGISTER: '#!/register',
  USER_INFOMATION: '#!/user',
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
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 6,
};

const ERROR_MESSAGE = {
  PRODUCT_NAME_IS_DUPLICATED: '이미 존재하는 이름의 상품입니다.',
  PRODUCT_NAME_LENGTH: `상품명은 최대 ${RULES.MAX_LENGTH_PRODUCT_NAME}글자까지 입력해주세요.`,
  PRODUCT_PRICE: `상품가격은 ${RULES.MIN_PRODUCT_PRICE}원~${RULES.MAX_PRODUCT_PRICE}원 사이여야 하며 10원으로 나누어 떨어져야 합니다.`,
  PRODUCT_AMOUNT: `한 제품당 수량은 최대 ${RULES.MAX_PRODUCT_AMOUNT}개 입니다.`,
  TOO_MUCH_VENDING_MACHINE_CHANGE: `자판기가 보유할 수 있는 최대 금액은 ${RULES.MAX_VENDING_MACHINE_CHANGE}원 입니다.`,
  TOO_MUCH_VENDING_MACHINE_INPUT_MONEY: `자판기에 투입할 수 있는 최대 금액은 ${RULES.MAX_VENDING_MACHINE_INPUT_MONEY}원 입니다.`,
  IS_NOT_UNIT_OF_TEN: `투입할 금액의 단위는 ${RULES.MINIMUM_CHANGE}원입니다.`,
  IS_NOT_POSITIVE_INTEGER: '투입할 금액은 0보다 큰 금액이어야 합니다.',
  NOT_ENOUGH_RETURN_CHANGE: '자판기에 더 이상 반환할 수 없는 잔돈이 없습니다.',
  NOT_ENOUGH_MONEY: '투입된 금액이 부족합니다.',
  NOT_ENOUGH_AMOUNT: '제품이 품절 상태입니다.',
  NAME_LENGTH_IS_INVALID: '이름은 2~6자 사이의 길이여야합니다.',
  EMAIL_IS_DUPLICATED: '중복된 이메일 주소입니다.',
  EMAIL_IS_INVALID: '올바르지 않은 이메일 주소입니다.',
  PASSWORD_IS_TOO_SHORT: '비밀번호가 너무 짧습니다.',
  PASSWORD_IS_INVALID: '비밀번호는 6~20자 사이의 영문과 숫자, 특수문자의 조합이어야합니다.',
  PASSWORDCHECK_IS_NOT_EQUAL: '비밀번호 확인이 다릅니다.',
  USER_IS_NOT_EXIST: '해당 유저를 찾을 수 없습니다.',
  PASSWORD_IS_INCORRECT: '비밀번호가 다릅니다.',
  INVALID_ACCESS_TOKEN: '유효하지 않은 유저 데이터입니다.',
  USER_NOT_LOGIN: '해당 작업을 위해서는 로그인이 필요합니다.',
};

const ALERT_MESSAGE = {
  ADD_CHARGE_SUCCESS: (money: number) => `자판기에 잔돈 ${money}원을 추가하였습니다.`,
  ADD_PRODUCT_SUCCESS: (productName: string) => `자판기에 상품 '${productName}'을 추가하였습니다.`,
  MODIFY_PRODUCT_SUCCESS: (productName: string) => `상품 '${productName}'의 정보를 수정하였습니다.`,
  DELETE_PRODUCT_SUCCESS: (productName: string) => `상품 '${productName}'를 삭제하였습니다.`,
  PURCHASE_PRODUCT_SUCCESS: (productName: string) => `'${productName}'를 구입하였습니다.`,
  INPUT_MONEY_SUCCESS: (money: number) => `자판기에 ${money}원을 투입하였습니다.`,
  RETURN_CHARGE_SUCCESS: '잔돈을 반환하였습니다.',
  WAITING_STATE: '잠시만 기다려주세요.',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다.',
  USER_INFO_MODIFY_SUCCESS: '회원 정보 수정이 완료되었습니다.',
  LOGIN_SUCCESS: (name: string) => `${name}님, 환영합니다.`,
  LOGOUT_SUCCESS: '로그아웃 되었습니다.',
};

const REMOVE_CONFIRM_MESSAGE = '정말로 삭제하시겠습니까?';
const DEV_MODE = false;
const SERVER_URL = 'https://usage-json-server.herokuapp.com';

export { PATH_NAME, RULES, ERROR_MESSAGE, REMOVE_CONFIRM_MESSAGE, ALERT_MESSAGE, DEV_MODE, SERVER_URL };
