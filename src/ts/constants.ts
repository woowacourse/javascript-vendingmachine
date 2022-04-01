export const PATH_ID = {
  PRODUCT_MANAGE: '/javascript-vendingmachine/#!/product-manage',
  RECHARGE: '/javascript-vendingmachine/#!/recharge',
  PURCHASE_PRODUCT: '/javascript-vendingmachine/#!/purchase-product',
  NOT_FOUND: '/javascript-vendingmachine/#!/not-found',
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
};

export const SUCCESS_MESSAGE = {
  PRODUCT_REGISTERED: '입력하신 상품 정보가 등록되었습니다.',
  PRODUCT_EDITED: '선택하신 상품 정보가 수정되었습니다.',
  PRODUCT_DELETED: '선택하신 상품 정보가 삭제되었습니다.',
  MONEY_RECHARGED: '충전하신 금액만큼 동전을 보충하였습니다.',
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
};

export const STORAGE_ID = {
  MONEY: 'money',
  PRODUCTS: 'products',
  CURRENT_TAB: 'current-tab',
};
