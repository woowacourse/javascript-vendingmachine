import { CoinsType } from '../types';
import { COINS } from '../constants/constants';

export const generateCoinTableTemplate = (coins: CoinsType, coinTableRowLayout): string =>
  Object.keys(coins)
    .map(coinKey => coinTableRowLayout(COINS[coinKey], coins[coinKey]))
    .join('');
