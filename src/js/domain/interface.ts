import VendingMachineProduct from './VendingMachineProduct';
import { MONEY_NAME_STRING } from '../constants';

export interface ProductData {
  name: string;
  price: number;
  stock: number;
}

export interface VendingMachineProductDictionary {
  [id: string]: VendingMachineProduct;
}

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

export interface CoinStatus {
  FIVE_HUNDRED_WON: number;
  ONE_HUNDRED_WON: number;
  FIFTY_WON: number;
  TEN_WON: number;
}

export interface distributeStrategy {
  distribute(inputMoney: number): Coin[];
}

export interface Validator<T> {
  testFunc: (data: T) => boolean;
  errorMsg: string;
}

export interface changeValidationData {
  money: number;
  totalChange: number;
}

export interface moneyInsertValidationData {
  money: number;
  moneyInsert: number;
}
