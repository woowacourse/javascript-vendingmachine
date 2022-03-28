import { AppState, Tab } from './types';

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
  CHANGE_ACTIVE_TAB: 'change-active-tab',
};

export const COIN_UNITS = [500, 100, 50, 10];

export const initialState: AppState = {
  activeTab: Tab.ProductManageTab,
  chargedMoney: 0,
  chargedCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  productList: [],
};

export const VALIDATION_ERROR_NAME = 'validation-error';

export const PATH_TO_TAB_DIC: Record<string, Tab> = {
  '/': Tab.ProductManageTab,
  '/product-manage-tab': Tab.ProductManageTab,
  '/charge-money-tab': Tab.ChargeMoneyTab,
  '/purchase-product-tab': Tab.PurchaseProductTab,
};

export const ERROR_MESSAGE: { [k in string]: string } = {
  EMPTY_PRODUCT_NAME: '상품명을 입력해 주세요',
  OVER_MAX_LENGTH_PRODUCT_NAME: '상품명은 10글자 이내이어야 합니다',
  DUPLICATE_PRDUCT_NAME: '이미 등록된 상품입니다',

  EMPTY_PRODUCT_PRICE: '상품 기격을 입력해 주세요',
  NOT_NUMBER_PRODUCT_PRICE: '상품 가격은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_PRICE: '상품가격은 100원 ~ 10,000원 이내이어야 합니다',
  NOT_DIVIDED_BY_TEN_PRODUCT_PRICE: '상품 가격은 10원 단위이어야 합니다',

  EMPTY_PRODUCT_QUANTITY: '상품 수량을 입력해 주세요',
  NOT_NUMBER_QUANTITY: '상품 수량은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_QUANTITY: '상품 수량은 1개 ~ 20개 이내이어야 합니다',

  EMPTY_CHARGE_MONEY: '충전 금액을 입력해주세요.',
  NOT_NUMBER_CHARGE_MONEY: '충전 금액은 숫자이어야 합니다',
  NEGATIVE_CHARGE_MONEY: '충전 금액은 양수이어야 합니다.',
  NOT_DIVIDED_BY_TEN_CHARGE_MONEY: '충전 금액은 10원 단위이어야 합니다',
  OVER_MAX_CHARGE_MONEY: '잔돈으로 보유할 수 있는 최대 금액은 100,000원입니다.',
};

export const MAX_LENGTH_OF_PRODUCT_NAME = 10;
export const MIN_PRODUCT_PRICE = 100;
export const MAX_PRODUCT_PRICE = 10000;
export const MIN_COIN_UNIT = 10;
export const MIN_PRODUCT_QUANTITY = 1;
export const MAX_PRODUCT_QUANTITY = 20;
export const MAX_CHARGABLE_MONEY = 100000;
