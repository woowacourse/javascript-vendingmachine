import { coins } from '../types/vendingMachineCoinManager';
import { product } from '../types/vendingMachineProductManager';

import { ERROR_MESSAGE, COINS_INITIAL_STATE } from '../constants';

export const checkValidLengthProductName = (name: string): void => {
  if (name.length < 1 || name.length > 10) {
    throw new Error(ERROR_MESSAGE.WRONG_LENGTH_PRODUCT_NAME);
  }
};

export const checkDuplicatedProductName = (
  products: product[],
  newProduct: product
): void => {
  if (products.some((product: product) => product.name === newProduct.name)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};

export const checkEditDuplicateName = (
  editIndex: number,
  duplicatedNameIndex: number
): void => {
  if (duplicatedNameIndex !== -1 && editIndex !== duplicatedNameIndex) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};

export const checkValidProductPrice = (price: number): void => {
  if (price < 100 || price > 10000) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  }

  if (price % 10 !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
  }
};

export const checkValidProductQuantity = (quantity: number): void => {
  if (!Number.isInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }

  if (quantity < 1 || quantity > 20) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }
};

export const checkValidChargeMoney = (money: number): void => {
  if (money % 10 !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }
};

function pickRandomIndex(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomCoins = (money: number): coins => {
  const coinList: number[] = [10, 50, 100, 500];
  const coinsObject: coins = { ...COINS_INITIAL_STATE };

  let remainMoney: number = money;

  while (remainMoney) {
    const pickableCoins: number[] = coinList.filter(
      (coin: number) => coin <= remainMoney
    );
    const pickedCoin: number =
      pickableCoins[pickRandomIndex(0, pickableCoins.length - 1)];
    coinsObject[`COIN_${pickedCoin}`] += 1;
    remainMoney -= pickedCoin;
  }

  return coinsObject;
};

export const checkCanAddMoney = (
  currentMoney: number,
  coinList: coins
): void => {
  const totalMoney: number = Object.entries(coinList).reduce(
    (sum: number, [coin, count]: [string, number]) =>
      sum + Number(coin.replace('COIN_', '')) * count,
    currentMoney
  );

  if (totalMoney > 100000) {
    throw new Error(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(currentMoney));
  }
};
