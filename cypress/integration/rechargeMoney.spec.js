import { SUCCESS_MESSAGE, ERROR_MESSAGE, CONFIRM_MESSAGE } from '../../src/ts/constants.ts';

describe('잔돈 충전 테스트', () => {
  const baseUrl = '/index.html';
  const money = 2370;
  const coins = {
    coin500: 0,
    coin100: 0,
    coin50: 0,
    coin10: 0,
  };

  before(() => {
    cy.visit(baseUrl);
    cy.enterUserPage();
    cy.get('.tab-label').eq(1).click();

    cy.get('#recharge-input').type(money);
    cy.get('#recharge-button').click();

    cy.get('#coin-500')
      .last()
      .then((element) => {
        coins.coin500 = Number(element.text());
      });
    cy.get('#coin-100')
      .last()
      .then((element) => {
        coins.coin100 = Number(element.text());
      });
    cy.get('#coin-50')
      .last()
      .then((element) => {
        coins.coin50 = Number(element.text());
      });
    cy.get('#coin-10')
      .last()
      .then((element) => {
        coins.coin10 = Number(element.text());
      });
  });

  it('상품 정보를 입력하고 추가 버튼을 누르면 상품이 테이블에 추가된다(동전 합 구하기, 표시된 보유 금액, 알림창).', () => {
    const sumCoins =
      coins.coin500 * 500 + coins.coin100 * 100 + coins.coin50 * 50 + coins.coin10 * 10;
    expect(sumCoins).to.equal(money);
    cy.get('#current-holding-money').should('have.text', money);
    cy.checkToastMessage(SUCCESS_MESSAGE.MONEY_RECHARGED);
  });
});
