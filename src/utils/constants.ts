import { TCoinWallet, TCoinWalletKey } from '../domains/types';
import { TAction, TAuthAction, TStateKey } from '../stores/types';
import { THeaderTitle, TMention, TRange, TRouterAddress } from './types';

export const COIN_VALUES: TCoinWallet = {
  coin500: 500,
  coin100: 100,
  coin50: 50,
  coin10: 10,
};

export const COIN_KEYS: Array<TCoinWalletKey> = ['coin500', 'coin100', 'coin50', 'coin10'];

export const VENDING_MACHINE_STATE_KEYS: {
  PRODUCT_LIST: TStateKey;
  COIN_WALLET: TStateKey;
  INPUT_CHARGE: TStateKey;
  RETURN_COIN_WALLET: TStateKey;
} = {
  PRODUCT_LIST: 'PRODUCT_LIST',
  COIN_WALLET: 'COIN_WALLET',
  INPUT_CHARGE: 'INPUT_CHARGE',
  RETURN_COIN_WALLET: 'RETURN_COIN_WALLET',
};

export const ERROR_MSG = {
  NAME_OVER_LIMIT_LENGTH: '상품 명은 10글자를 초과할 수 없습니다.',
  NAME_EMPTY: '상품 명을 최소 한 글자를 입력해주세요.',
  PRICE_OUT_OF_RANGE: '상품가격을 100이상 10000미만로 입력해주세요.',
  PRICE_NOT_DIVISIBLE_BY_10: '상품가격을 10으로 나누어 떨어지도록 입력해주세요.',
  QUANTITY_OUT_OF_RANGE: '상품 수량을 0이상 20이하의 수로 입력해주세요.',
  PRODUCT_SOLD_OUT: '상품이 매진되었습니다.',
  CAN_NOT_REFERENCE_STATE: '조회할 수 없는 상태값 입니다',
  CHANGE_NOT_DIVISIBLE_BY_10: '금액은 10으로 나누어 떨어져야합니다.',
  CHANGE_OUT_OF_RANGE: '잔돈은 10이상 100000이하의 금액을 투입하여야 합니다.',
  CHARGE_OUT_OF_RANGE: '구매 금액은 10이상 10,000이하의 금액을 투입하여야 합니다.',
  OVER_CHARGE_INPUT: '금액이 부족합니다! 돈을 추가 투입해주세요',
  OUT_OF_CHANGE: '자판기에 보유 동전이 없습니다 관리자에게 문의해주세요',
  NOT_MATCH_EMAIL_FORM: '이메일의 형식에 맞게 입력해주세요',
  OVER_USER_NAME_RANGE: '이름은 최소 2글자 최대 6글자여야 합니다',
  NOT_MATCH_PASSWORD_FORM:
    '비밀번호는 영문자, 숫자, 특수기호로 이루어진 8 ~ 20글자 사이여야 합니다',
  NOT_SAME_PASSWORD: '비밀번호와 비밀번호 확인 란에 똑같은 값이 입력되어야 합니다',
  FAILED_SIGN_IN: '회원가입에 실패하였습니다!',
  FAILED_LOGIN: '아이디와 비밀번호를 다시 확인해주세요',
  FAILED_EDIT_USER_INFO: '회원 정보 수정에 실패하였습니다',
  FAILED_GET_USER_INFO: '로그인유저의 정보를 가져오는 것에 실패했습니다',
  WRONG_ACCESS: '잘못된 접근입니다',
};

export const NAME_LENGTH_LIMIT = 10;

export const PRICE_RANGE: TRange = {
  MIN: 100,
  MAX: 10000,
};

export const MONEY_DIVIDE_STANDARD = 10;

export const QUANTITY_RANGE: TRange = {
  MIN: 0,
  MAX: 20,
};

export const CHANGE_RANGE: TRange = {
  MIN: 10,
  MAX: 100000,
};

export const CHARGE_RANGE: TRange = {
  MIN: 10,
  MAX: 10000,
};

export const USER_NAME_RANGE: TRange = {
  MIN: 2,
  MAX: 6,
};

export const ACTION_TYPES: {
  ADD_PRODUCT: TAction;
  EDIT_PRODUCT: TAction;
  DELETE_PRODUCT: TAction;
  RECHARGE_CHANGE: TAction;
  INSERT_CHARGE: TAction;
  PURCHASE_PRODUCT: TAction;
  RETURN_COIN_WALLET: TAction;
} = {
  ADD_PRODUCT: 'addProduct',
  EDIT_PRODUCT: 'editProduct',
  DELETE_PRODUCT: 'deleteProduct',
  RECHARGE_CHANGE: 'rechargeChange',
  INSERT_CHARGE: 'insertCharge',
  PURCHASE_PRODUCT: 'purchaseProduct',
  RETURN_COIN_WALLET: 'returnCoinWallet',
};

export const NOTICE_MENTION: TMention = {
  ADD_PRODUCT: '상품이 추가되었습니다🛒',
  EDIT_PRODUCT: '상품이 수정되었습니다🩹',
  DELETE_PRODUCT: '상품이 삭제되었습니다🗑',
  RECHARGE_CHANGE: '잔돈이 충전되었습니다💰',
  INPUT_CHARGE: '금액이 투입되었습니다💸',
  PURCHASE_PRODUCT: '상품이 구입되었습니다💳',
  RETURN_CHARGE: '잔돈이 반환되었습니다🔁',
};

export const SNACKBAR_DELAY_TIME = 1000;

export const AuthActionTypes: {
  LOGIN: TAuthAction;
  LOGOUT: TAuthAction;
  SIGN_IN: TAuthAction;
  EDIT_USER_INFO: TAuthAction;
} = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGN_IN: 'signIn',
  EDIT_USER_INFO: 'editUserInfo',
};

export const HEADER_TITLE: THeaderTitle = {
  MAIN: '🍿 자판기 🍿',
  EDIT_INFO: '회원 정보 수정',
  LOGIN: '로그인',
  SIGN_IN: '회원가입',
};

export const ROUTER_ADDRESS: TRouterAddress = {
  PURCHASE_PRODUCT: '',
  MANAGE_PRODUCT: 'manage',
  RECHARGE_COIN: 'recharge',
  EDIT_USER_INFO: 'edit-user-info',
  LOGIN: 'login',
  SIGN_IN: 'signin',
};
