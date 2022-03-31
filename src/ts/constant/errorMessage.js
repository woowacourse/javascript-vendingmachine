export const ITEM_ERROR_MESSAGE = {
  BLANK_NOT_ALLOWED: '빈칸 없이 모두 입력해주세요.',
  NOT_NUMBER_TYPE: '가격과 수량은 숫자로 입력해주세요.',
  ITEM_NAME_MAX_LENGTH: '상품명은 최대 10글자까지 가능합니다.',
  ALREADY_EXIST: '이미 등록된 상품입니다.',
  EXCEED_PRICE_RANGE: '상품 가격은 100원 이상, 10,000원 이하여야 합니다.',
  NOT_DIVIDED_BY_PRICE_UNIT: '상품 가격은 10원으로 나누어떨어져야 합니다.',
  EXCEED_QUANTITY_RANGE: '상품 수량은 최소 1개부터 최대 20개까지 넣을 수 있습니다.',
  NOT_DIVIDED_BY_QUANTITY_UNIT: '상품 수량은 1개로 나누어떨어져야 합니다.',
};

export const CASH_ERROR_MESSAGE = {
  NOT_NUMBER_TYPE: '숫자를 입력해주세요.',
  LOWER_THAN_MIN_RANGE: '충전할 금액은 10원 이상이여야 합니다.',
  EXCEED_TOTAL_AMOUNT_RANGE: '보유할 수 있는 최소 금액은 0원, 최대 금액은 100,000원입니다.',
  NOT_DIVIDED_BY_UNIT: '잔돈은 10원으로 나누어 떨어져야 합니다.',
};
