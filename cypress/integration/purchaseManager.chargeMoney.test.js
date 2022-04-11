describe('상품 구매 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.changeTab('purchase');
  });

  it('구매 금액을 충전할 수 있다.', () => {
    const chargeMoney = 5000;

    cy.chargeMoney(chargeMoney);

    cy.get('.money-for-purchase-section__total-money').should(
      'have.text',
      chargeMoney
    );
  });

  it('구매 금액은 누적해서 충전할 수 있다.', () => {
    const chargeMoney = 5000;
    const chargeMoney2 = 10000;

    cy.chargeMoney(chargeMoney);
    cy.chargeMoney(chargeMoney2);

    cy.get('.money-for-purchase-section__total-money').should(
      'have.text',
      chargeMoney + chargeMoney2
    );
  });

  it('남은 동전은 반환할 수 있다.', () => {
    const chargeCoinsMoney = 10000;
    cy.changeTab('coins');
    cy.chargeCoins(chargeCoinsMoney);

    cy.changeTab('purchase');
    const chargeMoney = 5000;

    cy.chargeMoney(chargeMoney);
    cy.get('.money-for-purchase-return-button').click();
    cy.get('.money-for-purchase-section__total-money').should('have.text', 0);

    cy.changeTab('coins');
    cy.get('.charge-form-section__total-coin').should(
      'have.text',
      chargeCoinsMoney - chargeMoney
    );
  });
});
