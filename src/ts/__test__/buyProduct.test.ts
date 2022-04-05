import { VendingMachine } from '../../index.d';
import { USER_INPUT_MONEY_RULES, ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

let vendingMachine: VendingMachine;

describe('유저 투입 금액', () => {
  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MOD_UNIT}으로 나누어 떨어지지 않을 때, 금액이 충전되면 안된다.`, () => {
    const userInputMoney = 1555;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_USER_INPUT_MONEY_MOD_UNIT);
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}원을 넘을 때, 금액이 충전되면 안된다.`, () => {
    const userInputMoney = 2000;
    const holdingMoney = 9000;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    vendingMachine.chargeUserMoney(holdingMoney);

    expect(test).toThrow(ERROR_MESSAGE.EXCEED_MAX_USER_INPUT_MONEY);
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}일 때, 금액이 충전된다.`, () => {
    const userInputMoney = USER_INPUT_MONEY_RULES.MAX_HAVE;

    vendingMachine.chargeUserMoney(userInputMoney);

    expect(vendingMachine.totalUserInputMoney).toBe(userInputMoney);
  });
});

describe('반환 금액', () => {
  const calculateReturnChange = (coins: Array<number>): number => 
    Object.entries(coins).reduce((acc, [amount, count]) => acc + Number(amount) * count, 0);

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it('동전의 총액이 4500이고 유저 투입 금액이 3000일 때, 유저 투입 금액만큼 반환한다.', () => {
    const inputMoney = 4500;
    const userInputMoney = 3000;

    vendingMachine.chargeMoney(inputMoney);
    vendingMachine.chargeUserMoney(userInputMoney);

    expect(calculateReturnChange(vendingMachine.returnChangeCoins())).toBe(userInputMoney);
  });

  it('동전의 총액이 4500이고 유저 투입 금액이 6210일 때, 동전의 총액만큼 반환한다.', () => {
    const inputMoney = 4500;
    const userInputMoney = 3000;

    vendingMachine.chargeMoney(inputMoney);
    vendingMachine.chargeUserMoney(userInputMoney);

    expect(calculateReturnChange(vendingMachine.returnChangeCoins())).toBe(inputMoney);
  });
});
