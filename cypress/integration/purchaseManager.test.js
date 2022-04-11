describe('상품 구매 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.changeTab('purchase');
  });
});
