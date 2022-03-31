import { InitialCoins } from '../types/vendingMachineChargeMoneyManager';
import { ChargeMoney } from '../types/constants';

export const CHARGE_MONEY: ChargeMoney = {
  MAX_TOTAL_CHARGE_MONEY: 100000,
  UNIT: 10,
};

export const COINS: InitialCoins = {
  INITIAL_QUANTITY_STATE: {
    QUANTITY_COIN_500: 0,
    QUANTITY_COIN_100: 0,
    QUANTITY_COIN_50: 0,
    QUANTITY_COIN_10: 0,
  },
  INITIAL_LIST: [10, 50, 100, 500],
};
