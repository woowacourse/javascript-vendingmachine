import { ERROR_MESSAGE, COIN, MONEY } from '../../src/constants';

describe('잔돈을 충전한다 - 실패케이스', () => {
  const email = `${Date.now()}@gmail.com`;
  const name = '윤병인';
  const password = 'Abcde123!';

  before(() => {
    cy.register(email, name, password);
    cy.login(email, password);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('빈 값을 허용하지 않는다', () => {
    const money = '';
    cy.chargeMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_CHARGE_MONEY);
  });

  it('숫자만 입력 가능하다.', () => {
    const money = '1,000';
    cy.chargeMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);
  });

  it('양수만 입력 가능하다', () => {
    const money = '-1000';
    cy.chargeMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);
  });

  it(`${COIN.MIN_UNIT.toLocaleString()}원으로 나누어 떨어지는 금액만 투입할 수 있다`, () => {
    const money = '1001';
    cy.chargeMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);
  });

  it(`잔돈으로 보유할 수 있는 최대 금액은 ${MONEY.MAX.toLocaleString()}원이다`, () => {
    const money = `${MONEY.MAX + 1000}`;
    cy.chargeMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);
  });
});
