import VendingMachineProduct from './VendingMachineProduct';

export interface ProductData {
  name: string;
  price: number;
  stock: number;
}

export interface VendingMachineProductDictionary {
  [id: string]: VendingMachineProduct;
}

export interface Coin {
  name: string;
  value: number;
  count: number;
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

export interface changeValidationData {
  money: number;
  totalChange: number;
}
