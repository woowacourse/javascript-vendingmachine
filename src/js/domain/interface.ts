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
  [id: string]: number;
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
