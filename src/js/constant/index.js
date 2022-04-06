export const ERROR_MESSAGE = {
  DUPLICATED_NAME: "중복된 상품은 입력 할 수 없습니다.",
  MAXIMUM_NAME_LENGTH: "상품명은 10자이하로 입력해주세요",
  VALID_PRICE: "유효한 가격을 입력해주세요",
  MINIMUM_COUNT: "추가하는 수량은 0이하가 될수가 없습니다.",
  MAXIMUM_COUNT: "수량은 최대 20개까지 추가 가능합니다.",
  DIVIDED_BY_MINIMUM_COIN: "투입된 금액은 10으로 나누어 떨어져야합니다.",
  MAXIMUM_CHANGES: "최대 잔액은 100000원 입니다.",
  MINIMUM_CHANGES: "금액은 0원보다 높아야합니다.",
  MAXIMUM_USER_INPUT: "금액은 최대 10000원까지 투입할수 있습니다",
  NO_PRODUCT: "상품의 재고가 없습니다",
  LACK_OF_BALANCE: "잔액이 부족합니다",
  MUST_LOGIN: "로그인후 이용해주세요",
  ALREADY_LOGIN: "이미 로그인이 되어있습니다",
  VALID_PASSWORD:
    "비밀번호는 8 ~ 15자 사이에 문자,숫자,특수문자를 하나 포함해야합니다.",
  VALID_NAME: "이름은 2 ~ 6글자만 가능합니다",
  NOT_MATCH_PASSWORD: "비밀번호 확인이 비밀번호와 일치하지 않습니다",
};

export const VENDING_MACHINE_NUMBER = {
  MAXIMUM_CHANGES: 100000,
  MAXIMUM_USER_INPUT: 10000,
  MAXIMUM_PRICE: 10000,
  MINIMUM_PRICE: 100,
  MINIMUM_COIN: 10,
  MAXIMUM_COUNT: 20,
  MINIMUM_COUNT: 0,
  MAXIMUM_NAME_LENGTH: 10,
  MAX_USER_NAME: 6,
  MIN_USER_NAME: 2,
};

export const EVENT_TYPE = {
  CHARGE: "@charge",
  ADD: "@add",
  DELETE: "@delete",
  EDIT: "@edit",
};

export const CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?";

export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
