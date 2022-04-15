import VendingMachineProduct from './VendingMachineProduct';

type CoinName = 'FIVE_HUNDRED_WON' | 'ONE_HUNDRED_WON' | 'FIFTY_WON' | 'TEN_WON';
type CoinValue = 500 | 100 | 50 | 10;

export interface ProductData {
  name: string;
  price: number;
  stock: number;
}

export interface VendingMachineProductDictionary {
  [id: string]: VendingMachineProduct;
}

export interface Coin {
  name: CoinName;
  value: CoinValue;
  count: number;
}

export interface InitCoin {
  name: CoinName;
  value: CoinValue;
  count: 0;
}

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

export interface moneyValidationData {
  money: number;
  totalMoney: number;
}
