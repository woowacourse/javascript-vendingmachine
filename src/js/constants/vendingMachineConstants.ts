import { CoinsType } from '../types/types';

export const ITEM = {
  NAME: {
    MAX_LENGTH: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 10000,
    UNIT: 10,
  },
  QUANTITY: {
    MIN: 0,
    MAX: 20,
  },
};

export const InitialCoins: CoinsType = {
  fiveHundred: 0,
  hundred: 0,
  fifty: 0,
  ten: 0,
};

export const COINS: CoinsType = {
  fiveHundred: 500,
  hundred: 100,
  fifty: 50,
  ten: 10,
};

export const MONEY = {
  MIN: 0,
  CHARGE_MAX: 100000,
  INPUT_MAX: 10000,
  UNIT: 10,
};
