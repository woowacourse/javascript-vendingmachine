export const ERROR_MESSAGE = {
  DUPLICATED_NAME: "중복된 상품은 입력 할 수 없습니다.",
  MAXIMUM_NAME_LENGTH: "상품명은 10자이하로 입력해주세요",
  VALID_PRICE: "유효한 가격을 입력해주세요",
  MINIMUM_COUNT: "추가하는 수량은 0이하가 될수가 없습니다.",
  MAXIMUM_COUNT: "수량은 최대 20개까지 추가 가능합니다.",
  DIVIDED_BY_MINIMUM_COIN: "투입된 금액은 10으로 나누어 떨어져야합니다.",
  MAXIMUM_CHANGES: "최대 잔액은 100000원 입니다.",
  MINIMUM_CHANGES: "금액은 0원보다 높아야합니다.",
  VALID_USER_NAME_LENGTH: "이름은 2~6자 이내여야합니다. ",
  NOT_CONFIRMED_PASSWORD: "비밀번호가 일치하지 않습니다.",
  WRONG_LOGIN_INFORMATION: "이메일 혹은 비밀번호가 잘못 되었습니다.",
  EXISTED_EMAIL: "이미 존재하는 이메일입니다.",
} as const;

export const VENDING_MACHINE_BOUNDARY_NUMBER = {
  MAXIMUM_CHANGES: 100000,
  MAXIMUM_PRICE: 10000,
  MINIMUM_PRICE: 100,
  MINIMUM_COIN: 10,
  MAXIMUM_COUNT: 20,
  MINIMUM_COUNT: 0,
  MAXIMUM_NAME_LENGTH: 10,
} as const;

export enum EVENT_TYPE {
  CHARGE = "@charge-changes",
  ADD = "@add-product",
  DELETE = "@delete-product",
  EDIT = "@edit-product",
  INPUT = "@input-money",
  RETURN = "@return-changes",
  PURCHASE = "@purchase-product",
  SIGN_UP = "@sign-up",
  LOGIN = "@login",
  LOGOUT = "@logout",
  UPDATE_USER = "@update-user",
}

export const CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?" as const;

export const SNACKBAR_TYPE = {
  ERROR: "ERROR",
  ALERT: "ALERT",
};

export const SNACKBAR_CONSIST_TIME = 4000;

export const HASH = {
  PRODUCT_MANAGEMENT: "#!productManagement",
  CHARGE_CHANGES: "#!changesCharge",
  PRODUCT_PURCHASE: "#!purchaseProduct",
  SIGNUP: "#!signUp",
  LOGIN: "#!login",
  USER_INFO: "#!userInfo",
};

export const COOKIE_KEY = {
  USER_ID: "user_id",
  ACCESS_TOKEN: "access_token",
};
