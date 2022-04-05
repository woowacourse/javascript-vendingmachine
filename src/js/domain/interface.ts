import { Coin } from './types';
import VendingMachineProduct from './VendingMachineProduct';

export interface ProductData {
  name: string;
  price: number;
  stock: number;
}

export interface VendingMachineProductDictionary {
  [id: string]: VendingMachineProduct;
}

export interface distributeStrategy {
  distribute(inputMoney: number): Coin[];
}

export interface UserRegisterData {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

export interface UserUpdateData {
  email: string;
  name: string;
  password?: string;
  passwordConfirm?: string;
}

export interface SavedUserData {
  accessToken?: string;
  userId: number;
  email: string;
  name: string;
}

export interface Validator<T> {
  testFunc: (data: T) => boolean;
  errorMsg: string;
}

export interface changeValidationData {
  money: number;
  totalChange: number;
}

export interface userMoneyValidationData {
  money: number;
  userMoney: number;
}
