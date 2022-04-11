describe('상품을 구매할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.addProduct('콜라', 1500, 10);
    cy.get('#purchase-product-tab').click();
  });

  it('사용자는 금액을 자판기에 투입할 수 있다.', () => {
    const inputMoney = 10000;

    cy.get('#money-input').type(inputMoney);
    cy.get('#money-form button').click();
    cy.get('#money-form #money-amount').should('have.text', `${inputMoney}`);
  });

  it('상품을 구매할 수 있다', () => {
    const inputMoney = 10000;
    const productPrice = 1500;
    const productQuantity = 10;

    cy.get('#money-input').type(inputMoney);
    cy.get('#money-form button').click();
    cy.get('#money-form #money-amount').should('have.text', `${inputMoney}`);

    cy.get('.product-list-table-body .product-purchase-button').click();

    cy.get('#money-form #money-amount').should('have.text', `${inputMoney - productPrice}`);
    cy.get(
      '#purchase-product-list > .product-list-table-body > .product-row > .product-row-quantity',
    ).should('have.text', `${productQuantity - 1}`);
  });
});
