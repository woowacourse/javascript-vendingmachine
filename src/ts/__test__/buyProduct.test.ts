import { VendingMachine } from '../../index.d';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

describe('유저 투입 금액 테스트', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it(`유저 투입 금액이 10으로 나누어 떨어지지 않을 때, 동전이 충전되면 안된다.`, () => {
    const userInputMoney = 1555;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    expect(test).toThrow('투입 금액은 10의 배수로 입력해주세요!');
  });

  it(`유저 투입 금액이 10,000 초과일 때, 동전이 충전되면 안된다.`, () => {
    const userInputMoney = 10010;
    const test = () => vendingMachine.chargeUserMoney(userInputMoney);

    expect(test).toThrow('최대 10,000원까지 투입 가능합니다!');
  });
});
