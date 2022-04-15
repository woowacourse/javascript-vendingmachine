import { SelectorType, CoinsConstantType, IsLogInType } from '../types/constants';

export const SELECTOR: SelectorType = {
  ID: {
    APP: '#app',
    CONTENT: '#content',
    CHARGE_MONEY_FORM: '#charge-money-form',
    CURRENT_MONEY: '#current-money',
    ADD_ITEM_NAME: '#add-item-name',
    ADD_ITEM_PRICE: '#add-item-price',
    ADD_ITEM_QUANTITY: '#add-item-quantity',
    ADD_ITEM_FORM: '#add-item-form',
    PURCHASE_ITEM_FORM: '#purchase-item-form',
    SIGNUP: '#signup',
    PURCHASE_ITEM: '#purchaseItem',
    LOGIN: '#login',
    CHANGE_USER_INFO: '#changeUserInfo',
    HEADER_BUTTON_CONTAINER: '#header-button-container',
    USER_NAME: '#user-name',
    CHANGE_NAME_INPUT: '#change-name-input',
    CHANGE_PASSWORD_INPUT: '#change-password-input',
    CHANGE_FORM: '#change-form',
    LOGIN_EMAIL_INPUT: '#login-email-input',
    LOGIN_PASSWORD_INPUT: '#login-password-input',
    LOGIN_FORM: '#login-form',
    GO_TO_SIGNUP: '#go-to-signup',
    SIGNUP_EMAIL_INPUT: '#signup-email-input',
    SIGNUP_NAME_INPUT: '#signup-name-input',
    SIGNUP_PASSWORD_INPUT: '#signup-password-input',
    SIGNUP_FORM: '#signup-form',
  },
  CLASS: {
    CHARGE_MONEY_INPUT: '.charge-money-input',
    COIN_TABLE: '.coin-table',
    NAV_CONTAINER: '.nav-container',
    NAV_BUTTON: '.nav-button',
    ITEM_TABLE_BUTTON_CONTAINER: '.item-table-button-container',
    TABLE_CONTAINER: '.table-container',
    ITEM_TABLE_CONFIRM_BUTTON: '.item-table-confirm-button',
    ITEM_TABLE_DELETE_BUTTON: '.item-table-delete-button',
    ITEM_TABLE_CHANGE_BUTTON: '.item-table-change-button',
    PURCHASE_ITEM_INPUT: '.purchase-item-input',
    ITEM_TABLE_PURCHASE_BUTTON: '.item-table-purchase-button',
    RETURN_MONEY_BUTTON: '.return-money-button',
  },
  ID_STRING: {
    ITEM_MANGE_TAB: 'item-manage-tab',
    MONEY_CHARGE_TAB: 'money-charge-tab',
    ITEM_PURCHASE_TAB: 'item-purchase-tab',
    LOGIN_BUTTON: 'login-button',
    GO_TO_SIGNUP: 'go-to-signup',
    LOGIN_FORM: 'login-form',
    SIGNUP_FORM: 'signup-form',
    CHANGE_FORM: 'change-form',
    CHANGE_USER_INFO: 'change-user-info',
    LOGOUT: 'logout',
    USER_BADGE: 'user-badge',
    USER_NAME: 'user-name',
  },
  CLASS_STRING: {
    NAV_BUTTON_CLICKED: 'nav-button-clicked',
    TABLE_ITEM_NAME: 'table-item-name',
    TABLE_ITEM_PRICE: 'table-item-price',
    TABLE_ITEM_QUANTITY: 'table-item-quantity',
    TABLE_ITEM_INPUT_NAME: 'table-item-input-name',
    TABLE_ITEM_INPUT_PRICE: 'table-item-input-price',
    TABLE_ITEM_INPUT_QUANTITY: 'table-item-input-quantity',
    ITEM_TABLE_CHANGE_BUTTON: 'item-table-change-button',
    ITEM_TABLE_DELETE_BUTTON: 'item-table-delete-button',
    ITEM_TABLE_CONFIRM_BUTTON: 'item-table-confirm-button',
  },
};

export const COINS: CoinsConstantType = {
  fiveHundred: 500,
  hundred: 100,
  fifty: 50,
  ten: 10,
};

export const enum CONFIRM_MESSAGE {
  DELETE = '정말로 삭제하시겠습니까?',
  LOGOUT = '로그아웃하시겠습니까?',
}

export const ITEM = {
  NAME: {
    MAX_LENGTH: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 10000,
    UNIT: 10,
  },
  QUANTITY: {
    MIN: 0,
    MAX: 20,
  },
};

export const enum OWN_MONEY {
  MIN = 0,
  MAX = 100000,
  UNIT = 10,
}

export const enum PURCHASE_MONEY {
  MIN = 0,
  MAX = 10000,
  UNIT = 10,
}

export const enum URL_HASH {
  MANAGE_ITEM = '#mangeItem',
  CHARGE_MONEY = '#chargeMoney',
  PURCHASE_ITEM = '#purchaseItem',
  LOG_IN = '#login',
  SIGN_UP = '#signup',
  CHANGE_USER_INFO = '#changeUserInfo',
}

export const enum ERROR_MESSAGE {
  ITEM_NAME_DUPLICATED = '이미 등록된 상품명입니다.',
  ITEM_NAME_EMPTY_NAME = '공백으로된 상품명을 입력할 수 없습니다.',
  ITEM_NAME_OVER_MAX_LENGTH = '10자 이상의 상품명을 입력할 수 없습니다.',

  ITEM_PRICE_NOT_INTEGER = '정수가 아닌 숫자는 가격으로 입력할 수 없습니다.',
  ITEM_PRICE_UNDER_MIN = '100원보다 낮은 가격은 입력할 수 없습니다.',
  ITEM_PRICE_OVER_MAX = '10,000원 보다 큰 가격을 입력할 수 없습니다.',
  ITEM_PRICE_INVALID_UNIT = '10원 단위의 가격만 입력할 수 있습니다.',

  ITEM_QUANTITY_NOT_INTEGER = '정수가 아닌 숫자는 수량으로 입력할 수 없습니다.',
  ITEM_QUANTITY_UNDER_MIN = '0이하의 수는 수량으로 입력할 수 없습니다.',
  ITEM_QUANTITY_OVER_MAX = '20개 보다 많은 수량을 입력할 수 없습니다.',

  INPUT_MONEY_NOT_INTEGER = '정수가 아닌 숫자는 금액으로 입력할 수 없습니다.',
  INPUT_MONEY_UNDER_MIN = '0원이하의 금액은 투입할 수 없습니다.',
  INPUT_MONEY_OVER_MAX = '100,000원 보다 많은 금액을 투입할 수 없습니다.',
  INPUT_MONEY_INVALID_UNIT = '10원 단위의 금액만 투입할 수 있습니다.',

  INPUT_PURCHASE_MONEY_OVER_MAX = '10,000원 보다 많은 금액을 투입할 수 없습니다.',

  NO_INPUT_MONEY = '투입된 금액이 없습니다.',
  NO_CHANGE_MONEY = '자판기에 잔돈이 없습니다.',

  INVALID_PASSWORD = '영문, 숫자, 특수문자가 혼용된 8~16자의 비밀번호를 작성해주세요.',
}

export const enum SNACK_BAR_MESSAGE {
  USER_INFO_CHANGED = '회원 정보가 수정되었습니다.',
  LOGIN_SUCCESS = '로그인 되었습니다.',
  ITEM_ADDED = '상품이 추가되었습니다.',
  ITEM_EDITED = '상품이 수정되었습니다.',
  ITEM_PURCHASED = '상품을 구매하였습니다.',
  CHANGE_RETURNED = '잔돈이 반환되었습니다.',
  SIGNUP_SUCCESS = '회원가입 되었습니다.',
  CHANGE_CHARGED = '잔돈이 충전되었습니다.',
  MONEY_INPUT = '금액을 투입하였습니다.',
}

export const IsLogIn: IsLogInType = 'isLogIn';
