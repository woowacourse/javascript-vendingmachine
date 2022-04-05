import { VendingMachine } from '../../index.d';
import { USER_INPUT_MONEY_RULES, ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

describe('유저 투입 금액 테스트', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MOD_UNIT}으로 나누어 떨어지지 않을 때, 동전이 충전되면 안된다.`, () => {
    const userInputMoney = 1555;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_USER_INPUT_MONEY_MOD_UNIT);
  });

  it(`유저 투입 금액이 ${USER_INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}원을 넘을 때, 동전이 충전되면 안된다.`, () => {
    const userInputMoney = 2000;
    const holdingMoney = 9000;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    vendingMachine.chargeUserMoney(holdingMoney);

    expect(test).toThrow(ERROR_MESSAGE.EXCEED_MAX_USER_INPUT_MONEY);
  });
});
