describe('잔돈 충전 페이지를 테스트합니다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000');
    cy.login();
  });

  it('잔돈을 충전할 수 있습니다.', () => {
    cy.get('[data-destination=charge-money-tab]').click();
    cy.get('charge-money-form input').type(5000);
    cy.get('charge-money-form button').click();

    cy.get('charge-money-form label').contains('현재 보유 금액: 5,000원');
  });
});
