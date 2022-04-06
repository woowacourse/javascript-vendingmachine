import { SIGN_INPUT } from './appContants';
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
    OVER_CHARGE_MAX: `${MONEY.CHARGE_MAX.toLocaleString(
      'ko-KR'
    )}원 보다 많은 금액을 투입할 수 없습니다.`,
    OVER_INPUT_MAX: `${MONEY.INPUT_MAX.toLocaleString(
      'ko-KR'
    )}원 보다 많은 금액을 투입할 수 없습니다.`,
    INVALID_UNIT: `${MONEY.UNIT}원 단위의 금액만 투입할 수 있습니다.`,
  },
  ITEM_PURCHASE: {
    NO_STOCK: '구매 가능한 수량이 없습니다.',
    NO_MONEY: '상품을 구매하기에 돈이 부족합니다.',
  },
  INPUT_SIGN: {
    INVALID_EMAIL: '잘못된 이메일 형식입니다.',
    INVALID_NAME: `한글과 영문이 혼용되지 않는 ${SIGN_INPUT.NAME.MIN}이상 ${SIGN_INPUT.NAME.MAX}이하의 이름을 입력해주세요.`,
    INVALID_PASSWORD: `문자, 숫자, 특수문자가 하나 이상 포함된 ${SIGN_INPUT.PASSWORD.MIN}자 이하의 비밀번호를 입력해주세요.`,
    NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  },
  SIGN: {
    FAILED_SIGN_IN: '로그인에 실패했습니다.',
    FAILED_SIGN_UP: '회원가입에 실패했습니다.',
    FAILED_EDIT_DATA: '회원 정보 수정에 실패했습니다.',
  },
  PRODUCT: {
    FAILED_GET_ITEM: '상품을 가져오는데 실패했습니다.',
    FAILED_SAVE_ITEM: '상품을 저장하는데 실패했습니다.',
    FAILED_DELETE_ITEM: '상품을 삭제하는데 실패했습니다.',
    FAILED_EDIT_ITEM: '상품을 수정하는데 실패했습니다.',
    FAILED_GET_MONEY: '잔돈을 가져오는데 실패했습니다.',
    FAILED_UPDATE_MONEY: '잔돈을 업데이트하는데 실패했습니다.',
  },
};
