export const ERROR_MESSAGE = {
  ITEM_NAME: {
    DUPLICATE_ITEM: '이미 등록된 상품명입니다.',
    EMPTY_NAME: '공백으로된 상품명을 입력할 수 없습니다.',
    OVER_MAX_LENGTH: '10자 이상의 상품명을 입력할 수 없습니다.',
  },
  ITEM_PRICE: {
    NOT_INTEGER: '정수가 아닌 숫자는 가격으로 입력할 수 없습니다.',
    UNDER_MIN: '100원보다 낮은 가격은 입력할 수 없습니다.',
    OVER_MAX: '10,000원 보다 큰 가격을 입력할 수 없습니다.',
    INVALID_UNIT: '10원 단위의 가격만 입력할 수 있습니다.',
  },
  ITEM_QUANTITY: {
    NOT_INTEGER: '정수가 아닌 숫자는 수량으로 입력할 수 없습니다.',
    UNDER_MIN: '0이하의 수는 수량으로 입력할 수 없습니다.',
    OVER_MAX: '20개 보다 많은 수량을 입력할 수 없습니다.',
  },
  INPUT_MONEY: {
    NOT_INTEGER: '정수가 아닌 숫자는 금액으로 입력할 수 없습니다.',
    UNDER_MIN: '0원이하의 금액은 투입할 수 없습니다.',
    OVER_MAX: '100,000원 보다 많은 금액을 투입할 수 없습니다.',
    INVALID_UNIT: '10원 단위의 금액만 투입할 수 있습니다.',
  },
};
