import { Coins } from './domain.interface';

export const PRODUCT_CONDITION = {
  MAX_NAME_LENGTH: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 10000,
  UNIT_PRICE: 10,
  MAX_QUANTITY: 20,
};

export const COIN_VAULT_CONDITION = {
  MAX_BALANCE: 100000,
};

export const COIN_CONDITION = {
  UNIT_PRICE: 10,
  INIT_QUANTITY: 0,
};

export const COINS_PRICE_TABLE: Coins = {
  coin500: 500,
  coin100: 100,
  coin50: 50,
  coin10: 10,
};
