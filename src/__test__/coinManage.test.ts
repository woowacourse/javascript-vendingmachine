import ChargeManager from "../ts/mananger/ChargeManager";
import { CHARGE, ERROR_MESSAGES } from "../ts/utils/constants";

describe("잔돈 관리 테스트", () => {
  const chargeManager = new ChargeManager();

  test(`충전 금액이 ${CHARGE.UNIT}원 단위가 아니면 충전할 수 없다.`, () => {
    const inputCharge = 1001;

    expect(() => chargeManager.getRandomCoins(inputCharge)).toThrowError(ERROR_MESSAGES.INVALID_CHARGE_UNIT);
  });

  test(`충전 금액이 ${CHARGE.MIN_PRICE}원 보다 작으면 충전할 수 없다.`, () => {
    const inputCharge = 9;

    expect(() => chargeManager.getRandomCoins(inputCharge)).toThrowError(ERROR_MESSAGES.INVALID_CHARGE_RANGE);
  });

  test(`충전 금액이 ${CHARGE.MAX_PRICE}원 보다 크면 충전할 수 없다.`, () => {
    const inputCharge = 100010;

    expect(() => chargeManager.getRandomCoins(inputCharge)).toThrowError(ERROR_MESSAGES.INVALID_CHARGE_RANGE);
  });

  test("충전 금액을 올바르게 입력하면, 금액만큼의 동전이 랜덤으로 생성된다.", () => {
    const inputCharge = 5000;
    const randomCoins = chargeManager.getRandomCoins(inputCharge);
    chargeManager.addCoins(randomCoins);

    expect(chargeManager.getTotalCharge()).toBe(inputCharge);
  });
});
