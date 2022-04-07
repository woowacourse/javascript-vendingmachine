import { COIN_TYPE } from '../constants';

interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}
interface UserInfo {
  id?: string;
  email: string;
  name?: string;
  password: string;
}

type ProductInfoUnionType = keyof ProductInfo;
type CoinUnionType = typeof COIN_TYPE[number];
type Coins = { [K in CoinUnionType]: number } | {};

export { ProductInfo, UserInfo, ProductInfoUnionType, CoinUnionType, Coins };
