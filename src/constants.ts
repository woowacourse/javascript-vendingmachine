import { AppState, Tab } from './types';

export const COIN = {
  MIN_UNIT: 10,
  UNITS: [500, 100, 50, 10],
};

export const PRODUCT = {
  NAME: {
    MAX_LENGTH: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 10000,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 20,
  },
};

export const MONEY = {
  MAX: 100000,
};

export const INSERT_MONEY = {
  MAX: 10000,
};

export const ACTION = {
  ADD_PRODUCT: 'add-product',
  EDIT_PRODUCT: 'edit-product',
  DELETE_PRODUCT: 'delete-product',
  CHANGE_EDIT_MODE: 'change-edit-mode',
  CHARGE_COINS: 'charge-coins',
  CHANGE_ACTIVE_TAB: 'change-active-tab',
  INSERT_MONEY: 'insert-money',
  PURCHASE_PRODUCT: 'purchase-product',
  RELEASE_COIN: 'release-coin',
};

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
  insertedMoney: 0,
  changes: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
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
  OVER_MAX_LENGTH_PRODUCT_NAME: `상품명은 ${PRODUCT.NAME.MAX_LENGTH}글자 이내이어야 합니다`,
  DUPLICATE_PRDUCT_NAME: '이미 등록된 상품입니다',

  EMPTY_PRODUCT_PRICE: '상품 가격을 입력해 주세요',
  NOT_NUMBER_PRODUCT_PRICE: '상품 가격은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_PRICE: `상품 가격은 ${PRODUCT.PRICE.MIN.toLocaleString(
    'ko-kr'
  )}원 ~ ${PRODUCT.PRICE.MAX.toLocaleString('ko-kr')}원 이내이어야 합니다`,
  NOT_DIVIDED_BY_TEN_PRODUCT_PRICE: `상품 가격은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,

  EMPTY_PRODUCT_QUANTITY: '상품 수량을 입력해 주세요',
  NOT_NUMBER_QUANTITY: '상품 수량은 숫자이어야 합니다',
  NOT_IN_VALID_RANGE_PRODUCT_QUANTITY: `상품 수량은 ${PRODUCT.QUANTITY.MIN.toLocaleString(
    'ko-kr'
  )}개 ~ ${PRODUCT.QUANTITY.MAX.toLocaleString('ko-kr')}개 이내이어야 합니다`,

  EMPTY_CHARGE_MONEY: '충전 금액을 입력해주세요.',
  NOT_NUMBER_CHARGE_MONEY: '충전 금액은 숫자이어야 합니다',
  NEGATIVE_CHARGE_MONEY: '충전 금액은 양수이어야 합니다.',
  NOT_DIVIDED_BY_TEN_CHARGE_MONEY: `충전 금액은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,
  OVER_MAX_CHARGE_MONEY: `잔돈으로 보유할 수 있는 최대 금액은 ${MONEY.MAX.toLocaleString(
    'ko-kr'
  )}원입니다.`,

  EMPTY_INSERT_MONEY: '충전 금액을 입력해주세요.',
  NOT_NUMBER_INSERT_MONEY: '충전 금액은 숫자이어야 합니다',
  NEGATIVE_INSERT_MONEY: '충전 금액은 양수이어야 합니다.',
  NOT_DIVIDED_BY_TEN_INSERT_MONEY: `충전 금액은 ${COIN.MIN_UNIT.toLocaleString(
    'ko-kr'
  )}원 단위이어야 합니다`,
  OVER_MAX_INSERT_MONEY: `최대 투입 금액은 ${INSERT_MONEY.MAX.toLocaleString('ko-kr')}원입니다.`,

  NO_STOCK: '재고가 없습니다',
  NOT_ENOUGH_MONEY: '금액이 부족합니다',
};
