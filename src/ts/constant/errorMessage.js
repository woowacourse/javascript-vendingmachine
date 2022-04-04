export const ITEM_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '빈칸 없이 모두 입력해주세요.',
  NOT_NUMBER_TYPE: '가격과 수량은 숫자로 입력해주세요.',
  ITEM_NAME_MAX_LENGTH: '상품명은 최대 10글자까지 가능합니다.',
  ALREADY_EXIST: '이미 등록된 상품입니다. 같은 이름의 상품은 중복 등록할 수 없습니다.',
  EXCEED_PRICE_RANGE: '상품 가격은 100원 이상, 10,000원 이하여야 합니다.',
  NOT_DIVIDED_BY_UNIT: '상품 가격은 10원으로 나누어 떨어져야 합니다.',
  EXCEED_QUANTITY_RANGE: '상품 수량은 최소 1개부터 최대 20개까지 넣을 수 있습니다.',
};

export const CASH_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  LOWER_THAN_MIN_RANGE: '충전할 금액은 10원 이상이여야 합니다.',
  EXCEED_TOTAL_AMOUNT_RANGE: '보유할 수 있는 최소 금액은 0원, 최대 금액은 100,000원입니다.',
  NOT_DIVIDED_BY_UNIT: '잔돈은 10원으로 나누어 떨어져야 합니다.',
};

export const MONEY_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  EXCEED_TOTAL_AMOUNT_RANGE: '투입할 수 있는 최소 금액은 10원, 최대 금액은 10,000원입니다.',
  NOT_DIVIDED_BY_UNIT: '투입한 금액은 10원으로 나누어 떨어져야 합니다.',
};

export const PURCHASE_ERROR_MESSAGE = {
  OUT_OF_STOCK: '재고가 없습니다. 해당 상품은 더 이상 구매할 수 없습니다.',
  NOT_ENOUGH_MONEY: '잔돈이 부족합니다. 해당 상품 구매를 원하신다면 금액을 투입해 주세요.',
};
