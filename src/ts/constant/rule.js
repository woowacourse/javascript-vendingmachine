export const ITEM = {
  NAME_MAX_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  PRICE_UNIT: 10,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 20,
};

export const CASH = {
  MIN: 10,
  MAX: 100000,
  UNIT: 10,
};

export const COIN_500 = 500;
export const COIN_100 = 100;
export const COIN_50 = 50;
export const COIN_10 = 10;

export const MONEY = {
  MIN: 10,
  MAX: 10000,
  UNIT: 10,
};

export const REGISTER = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 6,
  PASSWORD_RULE: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
};

export const THUMBNAIL_OPTION_VALUE = {
  LOGOUT: 'logout',
  EDIT_USER_INFO: 'edit-user-info',
};

export const COOKIE_EXPIRED_PERIOD = 3;

export const SNACKBAR_MS_TIME = 2700;
