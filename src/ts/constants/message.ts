import {
  MAX_NAME_LENGTH,
  PRICE_RULE,
  MAX_QUANTITY,
  CASH_RULE,
  PURCHASE_CASH_RULE,
  USER_INFO_RULE,
} from '.';

const USER_SIGN_MESSAGE = {
  CONFIRM_SIGNOUT: '로그아웃하시겠습니까?',
  ERROR_USER_INFO_EMPTY: '모든 값을 입력해주세요.',
  ERROR_USER_NAME_LENGTH: `사용자 이름은 ${USER_INFO_RULE.MIN_NAME_LENGTH}~${USER_INFO_RULE.MAX_NAME_LENGTH}자 이내여야 합니다.`,
  ERROR_USER_PASSWORD_LENGTH: `비밀번호는 ${USER_INFO_RULE.MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
  ERROR_USER_CONFIRM_PASSWORD: '비밀번호가 다릅니다. 다시 입력해주세요.',
  SUCCESS_SIGNIN: '로그인에 성공하였습니다. 메인 화면으로 이동합니다.',
  SUCCESS_SIGNUP: '회원가입에 성공하였습니다. 로그인 화면으로 이동합니다.',
  SUCCESS_EDIT_USER_INFO:
    '회원정보 수정에 성공하였습니다. 메인 화면으로 이동합니다.',
  SUCCESS_SIGNOUT: '로그아웃되었습니다.',
  FAIL_SIGNIN: '로그인에 실패하였습니다. 다시 시도해주세요.',
  FAIL_SIGNUP: '회원가입에 실패하였습니다. 다시 시도해주세요.',
  FAIL_EDIT_USER_INFO: '회원정보 수정에 실패하였습니다. 다시 시도해주세요.',
};

const VENDING_MACHINE_MESSAGE = {
  CONFIRM_DELETE_PRODUCT: '을(를) 삭제하시겠습니까?',
  ERROR_SAME_PRODUCT: '이미 동일한 이름의 상품이 존재합니다.',
  ERROR_OVER_MAX_LENGTH: `상품명을 ${MAX_NAME_LENGTH}글자 이하로 입력해주세요.`,
  ERROR_INVALID_PRICE: `가격은 ${
    PRICE_RULE.MIN
  }원 이상 ${PRICE_RULE.MAX.toLocaleString()}원 이하여야 하며, ${
    PRICE_RULE.UNIT
  }으로 나누어 떨어져야 합니다.`,
  ERROR_OVER_MAX_QUANTITY: `상품 수량은 1개 이상 ${MAX_QUANTITY}개 이하로 입력해주세요.`,
  ERROR_EMPTY_VALUE: '상품 정보를 공백 없이 입력해주세요.',
  ERROR_INVALID_CASH: `금액은 ${CASH_RULE.MAX.toLocaleString()}원 이하여야 하며, ${
    CASH_RULE.UNIT
  }으로 나누어 떨어져야 합니다.`,
  ERROR_INVALID_PURCHASE_CASH: `금액은 ${PURCHASE_CASH_RULE.MAX.toLocaleString()}원 이하여야 하며, ${
    PURCHASE_CASH_RULE.UNIT
  }으로 나누어 떨어져야 합니다.`,
  ERROR_LACK_CASH: '금액이 부족합니다.',
  SUCCESS_ADD_PRODUCT: '추가되었습니다.',
  SUCCESS_EDIT_PRODUCT: '수정되었습니다.',
  SUCCESS_DELETE_PRODUCT: '삭제되었습니다.',
  SUCCESS_CHARGE_CASH: '충전되었습니다.',
  SUCCESS_CHARGE_PURCHASE_CASH: '투입되었습니다.',
  SUCCESS_RETURN_COINS: '반환되었습니다.',
  FAIL_RETURN_COINS: '반환할 돈이 없습니다.',
};

export { USER_SIGN_MESSAGE, VENDING_MACHINE_MESSAGE };
