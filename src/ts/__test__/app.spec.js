describe('구현 결과가 요구사항과 일치해야 한다.', () => {
  const baseURL = 'index.html';

  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('금액을 충전할 수 있다.', () => {
    cy.get('#buy-price-input').type(2000);
    cy.get('#buy-price-form')
      .submit()
      .then(() => {
        cy.get('#total-buy-price').should('have.text', 2000);
      });
  });
});
