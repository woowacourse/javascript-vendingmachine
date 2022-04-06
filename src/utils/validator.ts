import VendingMachine, { Item } from '../domains/VendingMachine';
import { CHARGE_AMOUNT, ITEM } from '../configs/constants';

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
      item.name.trim().length >= ITEM.NAME.LENGTH.MIN &&
      item.name.trim().length <= ITEM.NAME.LENGTH.MAX,
    errorMessage: `상품명은 ${ITEM.NAME.LENGTH.MIN}에서 ${ITEM.NAME.LENGTH.MAX} 글자 사이여야 합니다.`,
  },
  {
    test: (item: Item) => item.price % ITEM.PRICE.STEP === 0,
    errorMessage: `상품 가격은 ${ITEM.PRICE.STEP}원 단위여야 합니다.`,
  },
  {
    test: (item: Item) =>
      item.price >= ITEM.PRICE.MIN && item.price <= ITEM.PRICE.MAX,
    errorMessage: `상품 가격은 ${ITEM.PRICE.MIN}에서 ${ITEM.PRICE.MAX}원 사이여야 합니다.`,
  },
  {
    test: (item: Item) =>
      item.quantity >= ITEM.QUANTITY.MIN && item.quantity <= ITEM.QUANTITY.MAX,
    errorMessage: `상품의 수량은 ${ITEM.QUANTITY.MIN}에서 ${ITEM.QUANTITY.MAX}개 사이여야 합니다.`,
  },
];

export const updatedItemValidator: Validator = [
  {
    test: (vendingMachine: VendingMachine, name: string) =>
      vendingMachine.findItem(name),
    errorMessage: '존재하지 않는 상품입니다.',
  },
  {
    test: (vendingMachine: VendingMachine, name: string, updatedItem: Item) =>
      name === updatedItem.name || !vendingMachine.findItem(updatedItem.name),
    errorMessage: '이미 존재하는 상품명입니다. 다른 상품명을 입력해주세요.',
  },
];

export const removedItemValidator: Validator = [
  {
    test: (removedItem: Item) => removedItem,
    errorMessage: '존재하지 않는 상품입니다.',
  },
];

export const amountValidator: Array<Condition> = [
  {
    test: (amount: number) =>
      amount >= CHARGE_AMOUNT.MIN && amount <= CHARGE_AMOUNT.MAX,
    errorMessage: `충전 금액은 ${CHARGE_AMOUNT.MIN}에서 ${CHARGE_AMOUNT.MAX}원 사이여야 합니다.`,
  },
  {
    test: (amount: number) => amount % CHARGE_AMOUNT.STEP === 0,
    errorMessage: `${CHARGE_AMOUNT.STEP}원 단위의 금액을 입력해주세요.`,
  },
  {
    test: (amount: number, totalMoney: number) =>
      amount + totalMoney <= CHARGE_AMOUNT.MAX,
    errorMessage: `총액은 최대 ${CHARGE_AMOUNT.MAX}원까지 가능합니다`,
  },
];

export const insertMoneyValidator: Validator = [
  {
    test: (amount: number) => amount >= 10 && amount <= 1000000,
    errorMessage: `투입 금액은 10에서 1000000원 사이여야 합니다.`,
  },
  {
    test: (amount: number) => amount % 10 === 0,
    errorMessage: `10원 단위의 금액을 입력해주세요.`,
  },
  {
    test: (amount: number, insertedMoney: number) =>
      amount + insertedMoney <= 1000000,
    errorMessage: `총 투입 금액은 1000000원까지 가능합니다.`,
  },
];

export const purchaseItemValidator: Validator = [
  {
    test: (purchasedItem: Item, insertedMoney: number) =>
      purchasedItem.price <= insertedMoney,
    errorMessage: `투입 금액이 부족합니다.`,
  },
];

export const returnChangeValidator: Validator = [
  {
    test: (insertedMoney: number) => insertedMoney > 0,
    errorMessage: '투입한 금액이 없습니다.',
  },
];
