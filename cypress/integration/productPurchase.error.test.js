import { ERROR_MSG } from '../../src/utils/constants/error.ts';

describe('상품 관리 예외 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.addProduct('콜라', 1500, 1);
    cy.get('#purchase-product-tab').click();
  });

  it('사용자가 잘못된 금액을 투입하면 에러 토스트를 보게된다', () => {
    const invalidInputMoney = 5;

    cy.get('#money-input').type(invalidInputMoney);
    cy.get('#money-form button').click();
    cy.get('#toast').should('have.text', ERROR_MSG.CHANGE_OUT_OF_RANGE);
  });

  it('상품 금액이 보유 금액보다 크면 구매할 수 없다.', () => {
    const invalidInputMoney = 1000;

    cy.get('#money-input').type(invalidInputMoney);
    cy.get('#money-form button').click();
    cy.get('.product-list-table-body .product-purchase-button').click();

    cy.get('#toast').should('have.text', ERROR_MSG.NOT_ENOUGH_MONEY);
  });

  it('상품이 품절되었다면 구매할 수 없다.', () => {
    const invalidInputMoney = 3000;

    cy.get('#money-input').type(invalidInputMoney);
    cy.get('#money-form button').click();
    cy.get('.product-list-table-body .product-purchase-button').click();
    cy.get('.product-list-table-body .product-purchase-button').click();

    cy.get('#toast').should('have.text', ERROR_MSG.PRODUCT_SOLD_OUT);
  });
});
