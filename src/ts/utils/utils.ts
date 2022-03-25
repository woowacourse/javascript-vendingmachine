import { coins } from '../types/vendingMachineCoinManager';
import { product } from '../types/vendingMachineProductManager';

import {
  ERROR_MESSAGE,
  COINS,
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
  CHARGE_MONEY,
} from '../constants';

export const checkValidLengthProductName = (name: string): void => {
  if (!name) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_NAME);
  }

  if (
    name.length < PRODUCT_NAME.MIN_LENGTH ||
    name.length > PRODUCT_NAME.MAX_LENGTH
  ) {
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
  if (Number.isNaN(price)) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);
  }

  if (price < PRODUCT_PRICE.MIN_PRICE || price > PRODUCT_PRICE.MAX_PRICE) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE);
  }

  if (price % PRODUCT_PRICE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE);
  }
};

export const checkValidProductQuantity = (quantity: number): void => {
  if (Number.isNaN(quantity)) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);
  }

  if (!Number.isInteger(quantity)) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }

  if (
    quantity < PRODUCT_QUANTITY.MIN_QUANTITY ||
    quantity > PRODUCT_QUANTITY.MAX_QUANTITY
  ) {
    throw new Error(ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY);
  }
};

export const checkValidChargeMoney = (money: number): void => {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGE.EMPTY_CHARGE_MONEY);
  }

  if (money % CHARGE_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }
};

function pickRandomIndex(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomCoins = (money: number): coins => {
  const coinList: number[] = COINS.LIST;
  const coinsObject: coins = { ...COINS.INITIAL_STATE };

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

  if (totalMoney > CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY) {
    throw new Error(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(currentMoney));
  }
};
