import { Item } from '../domains/VendingMachine';
import { ERROR_MESSAGE, ITEM, MONEY_UNIT, AMOUNT } from '../constant';

interface Condition {
  test: Function;
  errorMessage: string;
}

type Validator = Array<Condition>;

export const validate = (validator: Validator, ...target: any): void => {
  validator.forEach(({ test, errorMessage }) => {
    if (!test(...target)) throw new Error(errorMessage);
  });
};

export const itemValidator: Validator = [
  {
    test: (item: Item) =>
      item.quantity <= ITEM.QUANTITY.MAX && item.quantity >= ITEM.QUANTITY.MIN,
    errorMessage: ERROR_MESSAGE.OVER_MAX_QUANTITY,
  },
  {
    test: (item: Item) => item.price % MONEY_UNIT === 0,
    errorMessage: ERROR_MESSAGE.WRONG_PRICE_UNIT,
  },
  {
    test: (item: Item) =>
      item.name.trim().length <= ITEM.NAME.MAX_LENGTH &&
      item.name.trim().length > 0,
    errorMessage: ERROR_MESSAGE.WRONG_NAME_LENGTH,
  },
  {
    test: (item: Item) =>
      item.price >= ITEM.PRICE.MIN && item.price <= ITEM.PRICE.MAX,
    errorMessage: ERROR_MESSAGE.WRONG_PRICE_RANGE,
  },
];

export const amountValidator: Array<Condition> = [
  {
    test: (amount: number) => amount >= AMOUNT.MIN && amount <= AMOUNT.MAX,
    errorMessage: ERROR_MESSAGE.WRONG_AMOUNT_RANGE,
  },
  {
    test: (amount: number) => amount % MONEY_UNIT === 0,
    errorMessage: ERROR_MESSAGE.WRONG_AMOUNT_UNIT,
  },
  {
    test: (amount: number, totalMoney: number) =>
      amount + totalMoney <= AMOUNT.MAX_TOTAL_MONEY,
    errorMessage: ERROR_MESSAGE.OVERFLOW_TOTAL_MONEY,
  },
];
