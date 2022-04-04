describe('상품 구매 페이지를 테스트한다.', () => {
  before(() => {
    cy.visit('http://localhost:9000');
  });

  it('금액을 입력하고 투입 버튼을 누르면 금액이 투입된다.', () => {
    cy.get('[data-destination=purchase-product-tab]').click();

    cy.get('purchase-product-form input').type(5000);
    cy.get('purchase-product-form button').click();
    cy.get('purchase-product-form label').last().should('have.text', '투입한 금액: 5,000원');
  });
});
