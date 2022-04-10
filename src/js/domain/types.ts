import { MONEY_NAME_STRING } from '../constants';

type FiveHundredCoin = {
  name: typeof MONEY_NAME_STRING.COIN_500_WON;
  value: 500;
};

type OneHundredCoin = {
  name: typeof MONEY_NAME_STRING.COIN_100_WON;
  value: 100;
};

type FiftyCoin = {
  name: typeof MONEY_NAME_STRING.COIN_50_WON;
  value: 50;
};

type TenCoin = {
  name: typeof MONEY_NAME_STRING.COIN_10_WON;
  value: 10;
};

export type Coin = (FiveHundredCoin | OneHundredCoin | FiftyCoin | TenCoin) & {
  count: number;
};
