describe('상품 관리 예외 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('상품명, 가격, 수량을 입력하고 확인 버튼을 누르면 입력한 상품이 등록된다.', () => {
    const duplicatedProductName = '콜라';
    const productPrice = 1000;
    const productQuantity = 20;

    cy.wait(1000);
    cy.addProduct(duplicatedProductName, productPrice, productQuantity).then(
      () => {
        cy.get('.product-table__product-name').should('have.text', '콜라');
        cy.get('.product-table__product-price').should('have.text', '1000');
        cy.get('.product-table__product-quantity').should('have.text', '10');
      }
    );
  });
});
