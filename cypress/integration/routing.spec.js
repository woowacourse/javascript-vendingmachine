describe('페이지 이동을 테스트한다.', () => {
  before(() => {
    cy.visit('http://localhost:9000');
  });

  it('상품 관리 탭을 누르면  누르면 상품 관리 페이지로 이동한다.', () => {
    cy.get('[data-destination=product-manage-tab]').click();
    cy.location('pathname').should('equal', '/product-manage-tab');
  });

  it('상품 관리 탭을 누르면  누르면 상품 관리 페이지로 이동한다.', () => {
    cy.get('[data-destination=charge-money-tab]').click();
    cy.location('pathname').should('equal', '/charge-money-tab');
  });

  it('상품 구매 탭을 누르면 상팸 구매 페이지로 이동한다.', () => {
    cy.get('[data-destination=purchase-product-tab]').click();
    cy.location('pathname').should('equal', '/purchase-product-tab');
  });
});
