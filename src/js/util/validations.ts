import { ISingleProduct } from "../interface/product.interface";
import { ERROR_MESSAGE, VENDING_MACHINE_NUMBER } from "../constant";

export const checkDuplicatedName = (
  products: ISingleProduct[],
  newName: string,
  targetId = ""
) => {
  if (
    products.some((product) => {
      const { name, id } = product.get();
      return name === newName && (targetId === "" || id !== targetId);
    })
  ) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_NAME);
  }
};

export const checkNameLength = (name: string): void => {
  if (name.length > VENDING_MACHINE_NUMBER.MAXIMUM_NAME_LENGTH) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_NAME_LENGTH);
  }
};

export const checkValidPrice = (price: number): void => {
  if (
    price < VENDING_MACHINE_NUMBER.MINIMUM_PRICE ||
    price > VENDING_MACHINE_NUMBER.MAXIMUM_PRICE ||
    price % VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0
  ) {
    throw new Error(ERROR_MESSAGE.VALID_PRICE);
  }
};

export const checkValidCount = (count: number): void => {
  if (!count || count <= VENDING_MACHINE_NUMBER.MINIMUM_COUNT) {
    throw new Error(ERROR_MESSAGE.MINIMUM_COUNT);
  }

  if (count > VENDING_MACHINE_NUMBER.MAXIMUM_COUNT) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_COUNT);
  }
};

export const checkDividedByMinimumCoin = (money: number): void => {
  if (money % VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
    throw new Error(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
  }
};

export const checkMoneyOverMaximum = (money: number) => {
  if (money > VENDING_MACHINE_NUMBER.MAXIMUM_CHANGES) {
    throw new Error(ERROR_MESSAGE.MAXIMUM_CHANGES);
  }
};

export const checkMoneyUnderZero = (money: number) => {
  if (money <= 0) {
    throw new Error(ERROR_MESSAGE.MINIMUM_CHANGES);
  }
};
