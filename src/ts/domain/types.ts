import { coinType } from '../constants';

interface ProductInfo {
  name: string;
  price: number;
  quantity: number;
}
interface UserInfo {
  email: string;
  name: string;
  password: string;
}

type ProductInfoUnionType = keyof ProductInfo;
type CoinUnionType = typeof coinType[number];
type Coins = { [K in CoinUnionType]: number } | {};

export { ProductInfo, UserInfo, ProductInfoUnionType, CoinUnionType, Coins };
