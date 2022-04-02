import { coinType } from '../constants';

interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}

type ProductInfoUnionType = keyof ProductInfo;

type CoinUnionType = typeof coinType[number];
type Coins = { [K in CoinUnionType]: number } | {};

export type { Coins, CoinUnionType, ProductInfoUnionType, ProductInfo };
