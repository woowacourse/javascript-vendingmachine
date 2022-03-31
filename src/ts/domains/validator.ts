import { CHARGE_MONEY, ERROR_MESSAGE } from '../constants';
import { Coins } from '../types/vendingMachineCoinManager';
import { Product } from '../types/vendingMachineProductManager';

export const checkCanAddMoney = (
  currentMoney: number,
  coinList: Coins
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

const hasDuplicatedName = (products, targetName) =>
  products.some((product: Product) => product.name === targetName);

export const checkDuplicatedProductName = (
  products: Product[],
  newProduct: Product
): void => {
  if (hasDuplicatedName(products, newProduct.name)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};

export const checkDuplicatedEditName = (
  products: Product[],
  targetName: string,
  editedName: string
): void => {
  if (targetName === editedName) {
    return;
  }

  if (hasDuplicatedName(products, editedName)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME);
  }
};
