import { ERROR_MSG } from '../../src/utils/constants';

describe('상품 관리를 할 수 있다', () => {
  beforeEach(() => {
    cy.visit('/');
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

  it('잘못된 입력 값을 입력했을 때에 alert창을 띄워준다', () => {
    const productName = 'abcdefghijkl';
    const productPrice = 0;
    const productQuantity = 21;

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.addProduct(productName, productPrice, productQuantity).then(() => {
      expect(alertStub).to.be.calledWith(ERROR_MSG.NAME_OVER_LIMIT_LENGTH);
    });
  });
});
