import { ERROR_MESSAGE } from "../constant";
import ChangesProcessMachine from "./ChangesProcessMachine";

describe("잔돈 관리하는 도메인 테스트", () => {
  test("자판기 보유 금액을 누적하여 충전할 수 있다.", () => {
    const changeProcessMachine = new ChangesProcessMachine();
    changeProcessMachine.accumulateCoins({
      500: 2,
      100: 4,
      50: 5,
      10: 1,
    });
    changeProcessMachine.accumulateCoins({
      500: 1,
      100: 2,
      50: 3,
      10: 2,
    });
    expect(changeProcessMachine.getTotalChanges()).toEqual(2530);
  });

  test("자판기 보유 금액만큼의 동전이 무작위로 생성된다.", () => {
    const changeProcessMachine = new ChangesProcessMachine();
    changeProcessMachine.charge(2500);
    const chargedMoney = changeProcessMachine.getTotalChanges();
    expect(chargedMoney).toEqual(2500);
  });

  test("잔돈은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.", () => {
    const changeProcessMachine = new ChangesProcessMachine();
    expect(() => {
      changeProcessMachine.charge(1001);
    }).toThrowError(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
  });

  test("보유할 수 있는 최대 금액은 100,000원이다.", () => {
    const changeProcessMachine = new ChangesProcessMachine();
    expect(() => {
      changeProcessMachine.charge(1000000);
    }).toThrowError(ERROR_MESSAGE.MAXIMUM_CHANGES);
  });
});
