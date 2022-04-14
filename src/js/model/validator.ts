import { RULES } from '../constants';
import { Coin } from '../interfaces/VendingMachine.interface';

export const isValidProductNameLength = (name: string) => {
  return name.length <= RULES.MAX_LENGTH_PRODUCT_NAME && name.length > 0;
};

export const isUnitOfTen = (price: number) => {
  return price % RULES.MINIMUM_CHANGE === 0;
};

export const isPositiveInteger = (price: number) => {
  return price > 0;
};

export const isValidProductPrice = (price: number) => {
  return price >= RULES.MIN_PRODUCT_PRICE && price <= RULES.MAX_PRODUCT_PRICE && isUnitOfTen(price);
};

export const isValidProductAmount = (amount: number) => {
  return amount > RULES.MIN_PRODUCT_AMOUNT && amount <= RULES.MAX_PRODUCT_AMOUNT;
};

export const isValidPutMoney = (money: number) => {
  return money > 0;
};

export const isValidChangeCoins = (changes: Coin) => {
  return Object.values(changes).filter(coins => coins > 0).length !== 0;
};
