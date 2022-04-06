import {
  checkValidConsumerChargeMoney,
  checkCanSubtractConsumerChargeMoney,
} from '../ts/validation/checkConsumerChargeMoney';

describe('올바른 충전 금액 확인', () => {
  test(`잔돈이 10원으로 나누어 떨어지는지 확인한다.`, () => {
    const chargeMoney = 1000;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).not.toThrowError();
  });

  test(`잔돈이 10원으로 나누어 떨어지지 않을경우 에러가 발생된다.`, () => {
    const chargeMoney = 501;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 10원 단위로 입력해주세요.'
    );
  });

  test('충전 금액을 10원 미만으로 입력했을 경우 에러가 발생한다.', () => {
    const chargeMoney = 9;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
    );
  });

  test('충전 금액이 10000원을 초과할 경우 에러가 발생한다.', () => {
    const chargeMoney = 10010;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).toThrowError(
      '충전 금액을 잘못 입력하셨습니다. 충전 금액은 최소 10원 이상 10000원 이하로 입력해주세요.'
    );
  });

  test('충전 금액은 10000원까지 충전할 수 있다.', () => {
    const chargeMoney = 10000;

    expect(() => {
      checkValidConsumerChargeMoney(chargeMoney);
    }).not.toThrowError();
  });

  test('투입된 금액보다 상품의 가격이 더 큰 경우 에러가 발생한다.', () => {
    const chargeMoney = 1000;
    const productPrice = 1300;

    expect(() => {
      checkCanSubtractConsumerChargeMoney(chargeMoney, productPrice);
    }).toThrowError(
      '투입된 금액이 부족합니다. 금액을 확인후 금액을 추가로 투입해주세요.'
    );
  });

  test('투입된 금액이 상품의 가격과 같거나 많은 경우 상품을 구매할 수 있다.', () => {
    const chargeMoney = 1000;
    const productPrice = 1000;

    expect(() => {
      checkCanSubtractConsumerChargeMoney(chargeMoney, productPrice);
    }).not.toThrowError();
  });
});
