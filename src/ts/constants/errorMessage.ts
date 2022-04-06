import { ErrorMessage } from '../types/constants';
import { CHARGE_MONEY } from './chargeMoney';
import { PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_QUANTITY } from './product';

export const ERROR_MESSAGE: ErrorMessage = {
  WRONG_LENGTH_PRODUCT_NAME: `상품명을 잘못 입력하셨습니다. 상품명은 ${PRODUCT_NAME.MIN_LENGTH}글자 부터 ${PRODUCT_NAME.MAX_LENGTH}글자 이하로 작성해주세요.`,
  DUPLICATED_PRODUCT_NAME:
    '중복된 상품명을 입력하셨습니다. 중복되지 않는 상품명을 다시 입력해주세요.',
  WRONG_RANGE_PRODUCT_PRICE: `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.MIN_PRICE}원 이상 ${PRODUCT_PRICE.MAX_PRICE}원 이하로 입력해주세요.`,
  WRONG_UNIT_PRODUCT_PRICE: `상품 가격을 잘못 입력하셨습니다. 상품 가격은 ${PRODUCT_PRICE.UNIT}원 단위로 작성해주세요.`,
  WRONG_PRODUCT_QUANTITY: `상품 수량을 잘못 입력하셨습니다. 상품 수량은 최소 ${PRODUCT_QUANTITY.MIN_QUANTITY}개 이상 최대 ${PRODUCT_QUANTITY.MAX_QUANTITY}개 이하로 작성해주세요.`,
  WRONG_UNIT_CHARGE_MONEY: `충전 금액을 잘못 입력하셨습니다. 충전 금액은 ${CHARGE_MONEY.UNIT}원 단위로 입력해주세요.`,
  WRONG_RANGE_CHARGE_MONEY: `'충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 ${CHARGE_MONEY.CONSUMER_MIN_CHARGE_MONEY}원 이상 ${CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY}원 이하로 입력해주세요.'`,
  LACK_CHARGE_MONEY:
    '투입된 금액이 부족합니다. 금액을 확인후 금액을 추가로 투입해주세요.',
  EMPTY_RETURN_COINS: '반환될 금액이 없습니다.',
  EMPTY_PRODUCT_NAME:
    '상품명을 입력하지 않으셨습니다. 상품명을 먼저 입력해주세요.',
  EMAIL_ALREADY_EXIST:
    '이미 가입된 이메일 주소입니다. 회원가입을 하셨을 경우 로그인해 주세요.',
  OVERFLOW_CHARGE_MONEY(chargeMoney) {
    return `잔돈 누적 금액이 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}을 초과했습니다.<br />현재 누적 금액은 ${chargeMoney}원 입니다. 누적 금액이 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원이 넘지 않도록 작성해주세요.`;
  },
};

export const DELETE_PRODUCT_CONFIRM_MESSAGE = (productName: string): string =>
  `상품명 : ${productName}\n해당하는 상품을 삭제할 경우 복구 하실 수 없습니다. 정말 삭제하시겠습니까?`;
