import { SUCCESS_MESSAGE, ERROR_MESSAGE, CONFIRM_MESSAGE } from '../../src/ts/constants.ts';

describe('상품 관리 테스트', () => {
  const baseUrl = '/index.html';
  before(() => {
    cy.visit(baseUrl);
    cy.enterUserPage();
  });

  it('상품 정보를 입력하고 추가 버튼을 누르면 상품이 테이블에 추가된다.', () => {
    const product = {
      name: '사이다',
      price: '1000',
      quantity: '20',
    };
    cy.get('#product-name').type(product.name);
    cy.get('#product-price').type(product.price);
    cy.get('#product-quantity').type(product.quantity);

    cy.get('#add-button').click();

    cy.shouldHaveProductTable(product);
    cy.checkToastMessage(SUCCESS_MESSAGE.PRODUCT_REGISTERED);
  });

  it('중복된 상품 정보를 입력하고 추가 버튼을 누르면 상품이 테이블에 추가되지 않는다.', () => {
    const product = {
      name: '사이다',
      price: '1500',
      quantity: '15',
    };
    cy.get('#product-name').type(product.name);
    cy.get('#product-price').type(product.price);
    cy.get('#product-quantity').type(product.quantity);

    cy.get('#add-button').click();

    cy.checkToastMessage(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  });

  it('상품 테이블에서 상품 정보를 수정할 수 있다. ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '2000',
      quantity: '20',
    };
    cy.get('.edit-button').click();
    cy.editProduct(editedProduct);

    cy.shouldHaveProductTable(editedProduct);
    cy.checkToastMessage(SUCCESS_MESSAGE.PRODUCT_EDITED);
  });

  it('상품 정보 수정 시, 가격 규칙을 위배하여 수정할 수는 없다.(99원) ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '99',
      quantity: '20',
    };
    cy.get('.edit-button').click();
    cy.editProduct(editedProduct);

    cy.checkToastMessage(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보 수정 시, 가격 규칙을 위배하여 수정할 수는 없다.(10,001원) ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '10001',
      quantity: '20',
    };
    cy.editProduct(editedProduct);

    cy.checkToastMessage(ERROR_MESSAGE.PRICE_RANGE);
  });

  it('상품 정보 수정 시, 수량 규칙을 위배하여 수정할 수는 없다.(21개) ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '1000',
      quantity: '21',
    };
    cy.editProduct(editedProduct);

    cy.checkToastMessage(ERROR_MESSAGE.EXCEED_QUANTITY);
  });

  it('상품 정보 수정 시, 수량 규칙을 위배하여 수정할 수는 없다.(10.5개) ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '1000',
      quantity: '10.5',
    };
    cy.editProduct(editedProduct);

    cy.checkToastMessage(ERROR_MESSAGE.NOT_INTEGER);
  });

  it('상품 테이블에서 상품을 삭제할 수 있다. ', () => {
    const editedProduct = {
      name: '코카콜라',
      price: '1000',
      quantity: '10',
    };
    cy.editProduct(editedProduct);

    cy.get('.delete-button').click();
    cy.on('window:confirm', () => true);

    cy.get('.product-row-name').should('not.exist');
    cy.get('.product-row-price').should('not.exist');
    cy.get('.product-row-quantity').should('not.exist');
    cy.checkToastMessage(SUCCESS_MESSAGE.PRODUCT_DELETED);
  });
});
