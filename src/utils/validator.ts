import { Item } from '../domains/Item';

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
    test: (item: Item) => item.quantity <= 20,
    errorMessage: '상품의 최대 수량은 20개입니다.',
  },
  {
    test: (item: Item) => item.price % 10 === 0,
    errorMessage: '가격은 10원 단위여야 합니다.',
  },
  {
    test: (item: Item) => item.name.length <= 10 || item.name.length > 0,
    errorMessage: '상품명은 0~10 글자 사이여야 합니다.',
  },
  {
    test: (item: Item) => item.price >= 100 || item.price <= 10000,
    errorMessage: '상품 가격은 100원 이상, 10000원 이하여야 합니다.',
  },
];

export const amountValidator: Array<Condition> = [
  {
    test: (amount: number) => amount >= 10 || amount <= 100000,
    errorMessage: '10~100000 범위의 금액을 입력해주세요',
  },
  {
    test: (amount: number) => amount % 10 === 0,
    errorMessage: '10단위 금액을 입력해주세요',
  },
  {
    test: (amount: number, totalMoney: number) => amount + totalMoney <= 100000,
    errorMessage: '총액은 최대 100000까지 가능합니다',
  },
];
