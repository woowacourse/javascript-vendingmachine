import { ProductPurchaseMachine } from "./productPurchaseMachine.ts";
import { VENDING_MACHINE_NUMBER, ERROR_MESSAGE } from "../constant/index";

describe("상품을 구매하는 도메인 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("구매하기 위하여 금액을 충전할수 있다.", () => {
    const productPurchaseMachine = new ProductPurchaseMachine();
    productPurchaseMachine.charge(5000);
    productPurchaseMachine.charge(2000);

    expect(productPurchaseMachine.getChargedMoney()).toEqual(7000);
  });

  test(`금액은 ${VENDING_MACHINE_NUMBER.MINIMUM_COIN}원으로 나누어 떨어지는 금액만 투입할 수 있다.`, () => {
    const productPurchaseMachine = new ProductPurchaseMachine();
    expect(() => {
      productPurchaseMachine.charge(2513);
    }).toThrowError(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
  });

  test(`투입할수 있는 최대금액은 ${VENDING_MACHINE_NUMBER.MAXIMUM_USER_INPUT}이다`, () => {
    const productPurchaseMachine = new ProductPurchaseMachine();
    expect(() => {
      productPurchaseMachine.charge(10010);
    }).toThrowError(ERROR_MESSAGE.MAXIMUM_USER_INPUT);
  });

  test(`금액은 양의 정수만 투입가능하다`, () => {
    const productPurchaseMachine = new ProductPurchaseMachine();

    expect(() => {
      productPurchaseMachine.charge(-1000);
    }).toThrowError(ERROR_MESSAGE.MINIMUM_CHANGES);
  });

  test("물건을 구매하면 금액이 감소한다.", () => {
    const productPurchaseMachine = new ProductPurchaseMachine();

    productPurchaseMachine.charge(4000);
    productPurchaseMachine.spend(2000, 1);

    expect(productPurchaseMachine.getChargedMoney()).toEqual(2000);
  });

  test("물건이 없다면 구매는 불가능 하다", () => {
    const productPurchaseMachine = new ProductPurchaseMachine();
    productPurchaseMachine.charge(4000);

    expect(() => {
      productPurchaseMachine.spend(2000, 0);
    }).toThrowError(ERROR_MESSAGE.NO_PRODUCT);
  });

  test("물품 가격이 현재 투입된 금액보다 높을시 구매는 불가능하다", () => {
    const productPurchaseMachine = new ProductPurchaseMachine();
    productPurchaseMachine.charge(2000);

    expect(() => {
      productPurchaseMachine.spend(4000, 1);
    }).toThrowError(ERROR_MESSAGE.LACK_OF_BALANCE);
  });

  test("반환을 하면 그만큼의 금액이 차감된다.", () => {
    const productPurchaseMachine = new ProductPurchaseMachine();

    productPurchaseMachine.charge(5000);
    productPurchaseMachine.returned({
      500: 6,
      100: 10,
      50: 10,
      10: 50,
    });
    expect(productPurchaseMachine.getChargedMoney()).toEqual(0);
  });
});
