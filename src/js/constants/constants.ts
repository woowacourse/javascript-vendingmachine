import { SelectorType, CoinsConstantType } from '../types/constants';

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
  },
  ID_STRING: {
    ITEM_MANGE_TAB: 'item-manage-tab',
    MONEY_CHARGE_TAB: 'money-charge-tab',
    ITEM_PURCHASE_TAB: 'item-purchase-tab',
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

export enum ERROR_MESSAGE {
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
}

export const CONFIRM_MESSAGE = {
  DELETE: '정말로 삭제하시겠습니까?',
};

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

export const MONEY = {
  MIN: 0,
  MAX: 100000,
  UNIT: 10,
};

export const URL_HASH = {
  MANAGE_ITEM: '#mangeItem',
  CHARGE_MONEY: '#chargeMoney',
  PURCHASE_ITEM: '#purchaseItem',
};
