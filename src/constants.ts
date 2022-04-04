import { AppState } from './types';
import { convertToLocaleString } from './utils';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
  CHANGE_ACTIVE_TAB: 'change-active-tab',
  INSERT_MONEY: 'insert-money',
  RETURN_CHANGES: 'return-changes',
  PURCHASE_PRODUCT: 'purchase-product',
};

export const COIN_UNITS = [500, 100, 50, 10];

export const initialState: AppState = {
  chargedMoney: 0,
  insertedMoney: 0,
  chargedCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  returnCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  productList: [],
};

export const VALIDATION_ERROR_NAME = 'validation-error';

export const MAX_LENGTH_OF_PRODUCT_NAME = 10;
export const MIN_PRODUCT_PRICE = 100;
export const MAX_PRODUCT_PRICE = 10000;
export const MIN_COIN_UNIT = 10;
export const MIN_PRODUCT_QUANTITY = 1;
export const MAX_PRODUCT_QUANTITY = 20;
export const MAX_CHARGABLE_MONEY = 100000;

export const ERROR_MESSAGE: { [k in string]: string } = {
  DUPLICATE_PRDUCT_NAME: '이미 등록된 상품입니다',

  EMPTY_PRODUCT_NAME: '상품명을 입력해 주세요',
  EMPTY_PRODUCT_PRICE: '상품 가격을 입력해 주세요',
  EMPTY_PRODUCT_QUANTITY: '상품 수량을 입력해 주세요',
  EMPTY_CHARGE_MONEY: '충전 금액을 입력해주세요.',
  EMPTY_INSERT_MONEY: '투입하신 금액이 비어있습니다.',

  NOT_NUMBER_PRODUCT_PRICE: '상품 가격은 숫자이어야 합니다',
  NOT_NUMBER_QUANTITY: '상품 수량은 숫자이어야 합니다',
  NOT_NUMBER_CHARGE_MONEY: '충전 금액은 숫자이어야 합니다',
  NOT_NUMBER_INSERT_MONEY: '투입하신 금액은 숫자이어야 합니다.',

  NOT_IN_VALID_RANGE_PRODUCT_PRICE: `상품 가격은 ${convertToLocaleString(
    MIN_PRODUCT_PRICE
  )}원 ~ ${convertToLocaleString(MAX_PRODUCT_PRICE)}원 이내이어야 합니다`,
  NOT_IN_VALID_RANGE_PRODUCT_QUANTITY: `상품 수량은 ${convertToLocaleString(
    MIN_PRODUCT_QUANTITY
  )}개 ~ ${convertToLocaleString(MAX_PRODUCT_QUANTITY)}개 이내이어야 합니다`,

  NOT_DIVIDED_BY_TEN_PRODUCT_PRICE: `상품 가격은 ${convertToLocaleString(
    MIN_COIN_UNIT
  )}원 단위이어야 합니다`,
  NOT_DIVIDED_BY_TEN_CHARGE_MONEY: `충전 금액은 ${convertToLocaleString(
    MIN_COIN_UNIT
  )}원 단위이어야 합니다`,
  NOT_DIVIDED_BY_TEN_INSERT_MONEY: `투입하신 금액은 ${convertToLocaleString(
    MIN_COIN_UNIT
  )}원 단위이어야 합니다.`,

  OVER_MAX_CHARGE_MONEY: `잔돈으로 보유할 수 있는 최대 금액은 ${convertToLocaleString(
    MAX_CHARGABLE_MONEY
  )}원입니다.`,
  OVER_MAX_LENGTH_PRODUCT_NAME: `상품명은 ${MAX_LENGTH_OF_PRODUCT_NAME}글자 이내이어야 합니다`,
  OVER_MAX_INSERT_MONEY: `금액은 최대 ${convertToLocaleString(
    MAX_CHARGABLE_MONEY
  )}원까지만 투입 가능합니다.`,

  NOT_ENOUGH_CHANGES: '잔돈이 부족합니다. 관리자에게 문의해주세요.',
  NOT_ENOUGH_MONEY: '금액이 부족합니다.',

  NEGATIVE_INSERT_MONEY: '투입하신 금액은 양수이어야 합니다.',
  NEGATIVE_CHARGE_MONEY: '충전 금액은 양수이어야 합니다.',
};

export const CONFIRM_MESSAGE = {
  DELETE_PRODUCT: '해당 상품을 삭제하시겠습니까?',
};

export const MEMBER = {
  SUCCESS_SIGN_UP: '가입이 완료되었습니다.',
  PLEASE_EMAIL: '이메일을 입력해주세요.',
  PLEASE_PASSWORD: '비밀번호를 입력해주세요.',
  SUCCESS_LOGIN: '로그인 완료',
  SUCCESS_MODIFY_INFO: '정보가 변경되었습니다.',
};
