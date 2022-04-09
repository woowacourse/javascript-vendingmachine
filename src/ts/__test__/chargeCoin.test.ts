import { Admin } from '../../index.d';
import { INPUT_MONEY_RULES, ERROR_MESSAGE } from '../constant';
import AdminImpl from '../interactor/AdminImpl';

describe('동전 충전', () => {
  let admin: Admin;

  beforeEach(() => {
    admin = new AdminImpl();
    admin.vendingMachine.initialize();
  });

  it(`투입 금액이 ${INPUT_MONEY_RULES.MOD_UNIT}으로 나누어 떨어지지 않을 때, 동전이 충전되면 안된다.`, () => {
    const inputMoney = 1555;
    const test = () => admin.chargeMoney(inputMoney);

    expect(test).toThrow(ERROR_MESSAGE.INDIVISIBLE_INPUT_MONEY_MOD_UNIT);
  });

  it(`투입 금액이 ${INPUT_MONEY_RULES.MIN}원보다 작을 때, 동전이 충전되면 안된다.`, () => {
    const inputMoney = 900;
    const test = () => admin.chargeMoney(inputMoney);

    expect(test).toThrow(ERROR_MESSAGE.LACK_OF_INPUT_MONEY);
  });

  it(`보유 금액과 투입 금액의 합이 ${INPUT_MONEY_RULES.MAX_HAVE.toLocaleString()}원을 넘을 때, 동전이 충전되면 안된다.`, () => {
    const inputMoney = 11000;
    const holdingMoney = 90000;
    const test = () => admin.chargeMoney(inputMoney);

    admin.chargeMoney(holdingMoney);

    expect(test).toThrow(ERROR_MESSAGE.EXCEED_MAX_HAVE_MONEY);
  });

  it('투입 금액만큼 동전이 만들어져야 한다.', () => {
    const inputMoney = 89500;

    admin.chargeMoney(inputMoney);

    expect(admin.vendingMachine.calculateTotalAmount()).toBe(inputMoney);
  });
});
