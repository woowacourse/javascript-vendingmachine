import ProductManager from "../ts/mananger/ProductManager";
import { ERROR_MESSAGES, PURCAHSE } from "../ts/utils/constants";

describe("상품 구매 테스트", () => {
  const productManager = new ProductManager();

  test(`투입 금액이 ${PURCAHSE.MAX_AMOUNT}원을 초과하면, 상품을 추가할 수 없다.`, () => {
    const amount = PURCAHSE.MAX_AMOUNT + 1;

    expect(() => productManager.addPurchaseAmount(amount)).toThrowError(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT_RANGE);
  });

  test(`투입 금액이 ${PURCAHSE.MIN_AMOUNT}원보다 작다면, 상품을 추가할 수 없다.`, () => {
    const amount = PURCAHSE.MIN_AMOUNT - 1;

    expect(() => productManager.addPurchaseAmount(amount)).toThrowError(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT_RANGE);
  });

  test(`투입 금액이 ${PURCAHSE.UNIT}원 단위가 아니면, 상품을 추가할 수 없다.`, () => {
    const amount = 11;

    expect(() => productManager.addPurchaseAmount(amount)).toThrowError(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT_UNIT);
  });
});
