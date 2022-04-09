import { ERROR_MSG } from '../../src/utils/constants/error.ts';

describe('상품 관리 예외 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('잘못된 상품 명을 입력할 시 에러 토스트를 보게된다.', () => {
    const invalidProductName = 'abcdefghijkl';
    const productPrice = 100;
    const productQuantity = 20;

    cy.addProduct(invalidProductName, productPrice, productQuantity).then(() => {
      cy.get('#toast').should('have.text', ERROR_MSG.NAME_OVER_LIMIT_LENGTH);
    });
  });

  it('잘못된 상품 가격을 입력할 시 에러 토스트를 보게된다.', () => {
    const productName = 'abcl';
    const invalidProductPrice = 10;
    const productQuantity = 21;

    cy.addProduct(productName, invalidProductPrice, productQuantity).then(() => {
      cy.get('#toast').should('have.text', ERROR_MSG.PRICE_OUT_OF_RANGE);
    });
  });

  it('잘못된 상품 갯수를 입력할 시 에러 토스트를 보게된다.', () => {
    const productName = 'abcdl';
    const productPrice = 100;
    const invalidProductQuantity = 21;

    cy.addProduct(productName, productPrice, invalidProductQuantity).then(() => {
      cy.get('#toast').should('have.text', ERROR_MSG.QUANTITY_OUT_OF_RANGE);
    });
  });
});
