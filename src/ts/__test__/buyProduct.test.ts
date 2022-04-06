import { Product, ProductName, Buyer, Admin } from '../../index.d';
import { USER_INPUT_MONEY_RULES, ERROR_MESSAGE } from '../constant';
import AdminImpl from '../interactor/AdminImpl';
import buyerImpl from '../interactor/buyerImpl';

let buyer: Buyer;
let admin: Admin;

describe('유저 투입 금액', () => {
  beforeEach(() => {
    buyer = new buyerImpl();
    buyer.vendingMachine.initialize();
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MOD_UNIT}으로 나누어 떨어지지 않을 때, 금액이 충전되면 안된다.`, () => {
    const userInputMoney = 1555;
    const test = () => buyer.chargeMoney(userInputMoney);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_USER_INPUT_MONEY_MOD_UNIT);
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}원을 넘을 때, 금액이 충전되면 안된다.`, () => {
    const userInputMoney = 2000;
    const holdingMoney = 9000;
    const test = () => buyer.chargeMoney(userInputMoney);

    buyer.chargeMoney(holdingMoney);

    expect(test).toThrow(ERROR_MESSAGE.EXCEED_MAX_USER_INPUT_MONEY);
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}일 때, 금액이 충전된다.`, () => {
    const userInputMoney = USER_INPUT_MONEY_RULES.MAX_HAVE;

    buyer.chargeMoney(userInputMoney);

    expect(buyer.totalInputMoney).toBe(userInputMoney);
  });
});

describe('상품 구매', () => {
  const productName = '얍';
  const product: Product = { name: productName, price: 2000, quantity: 10 };

  beforeEach(() => {
    buyer = new buyerImpl();
    buyer.vendingMachine.initialize();
    buyer.vendingMachine.addProduct(product);
  });

  it('상품의 가격이 2000이고 유저 투입 금액이 1000일 때, 상품을 구입할 수 없다.', () => {
    const userInputMoney = 1000;
    const test = () => buyer.buyProduct(productName as unknown as ProductName);

    buyer.chargeMoney(userInputMoney);

    expect(test).toThrow(ERROR_MESSAGE.LOCK_OF_USER_INPUT_MONEY);
  });

  it('상품의 가격이 2000이고 유저 투입 금액이 3000일 때, 상품을 구입한 후 잔돈이 1000이여야 한다.', () => {
    const userInputMoney = 3000;

    buyer.chargeMoney(userInputMoney);
    buyer.buyProduct(productName as unknown as ProductName);

    expect(buyer.totalInputMoney).toBe(1000);
  });
});

describe('반환 금액', () => {
  const calculateReturnChange = (coins: Object): number => 
    Object.entries(coins).reduce((acc, [amount, count]) => acc + Number(amount) * count, 0);

  beforeEach(() => {
    buyer = new buyerImpl();
    admin = new AdminImpl();
    buyer.vendingMachine.initialize();
  });

  it('동전의 총액이 4500이고 유저 투입 금액이 3000일 때, 유저 투입 금액만큼 반환한다.', () => {
    const inputMoney = 4500;
    const userInputMoney = 3000;

    admin.chargeMoney(inputMoney);
    buyer.chargeMoney(userInputMoney);

    expect(calculateReturnChange(buyer.receiveChangeCoins())).toBe(userInputMoney);
  });

  it('동전의 총액이 4500이고 유저 투입 금액이 6210일 때, 동전의 총액만큼 반환한다.', () => {
    const inputMoney = 4500;
    const userInputMoney = 6210;

    admin.chargeMoney(inputMoney);
    buyer.chargeMoney(userInputMoney);

    expect(calculateReturnChange(buyer.receiveChangeCoins())).toBe(inputMoney);
  });
});
