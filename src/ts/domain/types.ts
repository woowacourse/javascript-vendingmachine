import { coinType } from '../constants';

interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}

type CoinUnionType = typeof coinType[number];

type Coins = { [K in CoinUnionType]: number } | {};

export type { Coins, CoinUnionType, ProductInfo };
