describe('상품 관리를 할 수 있다', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('상품을 추가할 수 있다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 3;

    cy.addProduct(productName, productPrice, productQuantity);

    cy.get('#current-product-list tr.product-row').should('exist');
  });

  it('상품을 삭제할 수 있다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 3;

    cy.addProduct(productName, productPrice, productQuantity);

    cy.get('.product-delete-button').click();

    cy.get('#current-product-list tr.product-row').should('not.exist');
  });

  it('상품을 수정할 수 있다', () => {
    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 3;

    cy.addProduct(productName, productPrice, productQuantity);
    cy.get('.product-edit-button').click();

    const editProductName = '사이다';

    cy.get('#product-name-edit-input').clear();
    cy.get('#product-name-edit-input').type(editProductName);

    cy.get('.product-confirm-button').click();

    cy.get(`.product-row td[data-product-name='${editProductName}']`).should('exist');
  });
});
