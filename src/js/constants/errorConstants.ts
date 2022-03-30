import { ITEM, MONEY } from './vendingMachineConstants';

export const ERROR_MESSAGE = {
  ITEM_NAME: {
    DUPLICATE_ITEM: `이미 등록된 상품명입니다.`,
    EMPTY_NAME: `공백으로된 상품명을 입력할 수 없습니다.`,
    OVER_MAX_LENGTH: `${ITEM.NAME.MAX_LENGTH}자 이상의 상품명을 입력할 수 없습니다.`,
  },
  ITEM_PRICE: {
    NOT_INTEGER: `정수가 아닌 숫자는 가격으로 입력할 수 없습니다.`,
    UNDER_MIN: `${ITEM.PRICE.MIN}원보다 낮은 가격은 입력할 수 없습니다.`,
    OVER_MAX: `${ITEM.PRICE.MAX.toLocaleString('ko-KR')}원 보다 큰 가격을 입력할 수 없습니다.`,
    INVALID_UNIT: `${ITEM.PRICE.UNIT}원 단위의 가격만 입력할 수 있습니다.`,
  },
  ITEM_QUANTITY: {
    NOT_INTEGER: `정수가 아닌 숫자는 수량으로 입력할 수 없습니다.`,
    UNDER_MIN: `${ITEM.QUANTITY.MIN}이하의 수는 수량으로 입력할 수 없습니다.`,
    OVER_MAX: `${ITEM.QUANTITY.MAX}개 보다 많은 수량을 입력할 수 없습니다.`,
  },
  INPUT_MONEY: {
    NOT_INTEGER: `정수가 아닌 숫자는 금액으로 입력할 수 없습니다.`,
    UNDER_MIN: `${MONEY.MIN}원이하의 금액은 투입할 수 없습니다.`,
    OVER_MAX: `${MONEY.MAX.toLocaleString('ko-KR')}원 보다 많은 금액을 투입할 수 없습니다.`,
    INVALID_UNIT: `${MONEY.UNIT}원 단위의 금액만 투입할 수 있습니다.`,
  },
};
