import { ERROR_MESSAGE, COIN, INSERT_MONEY } from '../../src/constants';

describe('상품을 구매한다 - 실패케이스', () => {
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

  it('돈 투입시 빈 값을 허용하지 않는다', () => {
    const money = '';
    cy.insertMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.EMPTY_INSERT_MONEY);
  });

  it('숫자만 입력 가능하다.', () => {
    const money = '1,000';
    cy.insertMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NOT_NUMBER_INSERT_MONEY);
  });

  it('양수만 입력 가능하다', () => {
    const money = '-1000';
    cy.insertMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NEGATIVE_INSERT_MONEY);
  });

  it(`${COIN.MIN_UNIT.toLocaleString()}원으로 나누어 떨어지는 금액만 투입할 수 있다`, () => {
    const money = '1001';
    cy.insertMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_INSERT_MONEY);
  });

  it(`충전할 수 있는 최대 금액은 ${INSERT_MONEY.MAX.toLocaleString()}원이다`, () => {
    const money = `${INSERT_MONEY.MAX + 1000}`;
    cy.insertMoney(money);
    cy.checkToastErrorMessage(ERROR_MESSAGE.OVER_MAX_INSERT_MONEY);
  });
});
