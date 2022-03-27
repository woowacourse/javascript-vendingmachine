import { VendingMachine } from '../../index.d';
import VendingMachineImpl from '../interactor/VendingMachineImpl';

describe('동전 충전 테스트', () => {
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    vendingMachine = new VendingMachineImpl();
  });

  it('투입 금액이 10으로 나누어 떨어지지 않을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 1555;
    const test = () => vendingMachine.chargeMoney(inputMoney);

    expect(test).toThrow('투입 금액은 10의 배수로 입력해주세요!');
  });

  it('투입 금액이 1000원보다 작을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 900;
    const test = () => vendingMachine.chargeMoney(inputMoney);

    expect(test).toThrow('1000원 이상 투입해주세요!');
  });

  it('보유 금액과 투입 금액의 합이 100000원을 넘을 때, 동전이 충전되지 않는지 확인', () => {
    const inputMoney = 11000;
    const holdingMoney = 90000;
    const test = () => vendingMachine.chargeMoney(inputMoney);

    vendingMachine.chargeMoney(holdingMoney);

    expect(test).toThrow('총 보유할 수 있는 금액은 100,000원 입니다!');
  });

  it('투입 금액만큼 동전이 만들어져야 한다.', () => {
    const inputMoney = 89500;

    vendingMachine.chargeMoney(inputMoney);

    expect(vendingMachine.coinCollection.calculateTotalAmount()).toBe(inputMoney);
  });
});
