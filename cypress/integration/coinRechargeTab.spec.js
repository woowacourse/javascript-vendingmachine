describe('잔돈 충전 탭 테스트', () => {
  beforeEach(() => {
    cy.visit('/#coin-recharge');
  });

  it('금액을 입력하고 충전 버튼을 누르면 잔돈이 충전된다.', () => {
    const cashInput = 1000;

    cy.get('.cash-charge-input').type(cashInput);
    cy.get('.input-form-button').click();

    cy.get('#charged-amount').should('have.text', cashInput);
  });
});
