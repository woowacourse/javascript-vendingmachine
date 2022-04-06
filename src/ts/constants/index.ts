export const PRODUCT_RULES = {
  MAX_NAME_LENGTH: 10,
  MIN_NAME_LENGTH: 1,
  MAX_PRICE: 10000,
  MIN_PRICE: 100,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
  PRICE_MOD_UNIT: 10,
};

export const CHARGE_MONEY_RULES = {
  MIN: 1000,
  MAX: 100000,
  MOD_UNIT: 10,
};

export const INPUT_MONEY_RULES = {
  MIN: 1000,
  MAX: 10000,
  MOD_UNIT: 10,
};

export const COINS = {
  VAULE_10: 10,
  VAULE_50: 50,
  VAULE_100: 100,
  VAULE_500: 500,
};

export const ALERT_MESSAGE = {
  PRODUCT_NAME_LENGTH: `상품명은 ${PRODUCT_RULES.MIN_NAME_LENGTH}글자부터 ${PRODUCT_RULES.MAX_NAME_LENGTH}글자까지만 가능합니다.`,
  PRODUCT_NAME_UNIQUE: `상품명은 중복되지 않아야합니다.`,
  PRODUCT_PRICE: `상품가격은 ${PRODUCT_RULES.PRICE_MOD_UNIT}으로 나누어 떨어져야하며, ${PRODUCT_RULES.MIN_PRICE}~${PRODUCT_RULES.MAX_PRICE}까지의 값만 가능합니다.`,
  PRODUCT_QUANTITY: `상품수량은 ${PRODUCT_RULES.MIN_QUANTITY}~${PRODUCT_RULES.MAX_QUANTITY}의 값만 가능합니다.`,

  CHARGE_MONEY: `투입금액은 ${CHARGE_MONEY_RULES.MOD_UNIT}으로 나누어 떨어져야하며, 최소 ${CHARGE_MONEY_RULES.MIN} 값 이상만 가능합니다.`,
  CHARGE_MONEY_MAX: `투입금액과 자판기 보유금액의 합이 ${CHARGE_MONEY_RULES.MAX}를 초과할 수 없습니다.`,

  INPUT_MONEY_RANGE: `투입금액은 ${INPUT_MONEY_RULES.MIN}~${INPUT_MONEY_RULES.MAX} 범위여야 합니다.`,
  INPUT_MONEY_MOD: `투입금액은 ${INPUT_MONEY_RULES.MOD_UNIT}으로 나눠져야 합니다.`,

  USER_NAME: `이름은 2~6글자 한글만 가능합니다.`,
  USER_EMAIL: `이메일은 woowa123@woowa.com 형식만 가능합니다.`,
  USER_PASSWORD: `비밀번호는 8~16글자 영대문자나 소문자, 특수문자, 숫자를 포함해야합니다.`,
  USER_PASSWORD_CONFIRM: `비밀번호가 동일하지 않습니다.`,
};
