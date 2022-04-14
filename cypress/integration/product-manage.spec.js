import { testid } from '../support/utils';

describe('상품을 관리 한다', () => {
  const email = `${Date.now()}@gmail.com`;
  const name = '윤병인';
  const password = 'Abcde123!';
  const product = {
    name: '콜라',
    price: 1000,
    quantity: 10,
  };

  before(() => {
    cy.register(email, name, password);
    cy.login(email, password);
  });

  it('상품을 추가한다', () => {
    cy.restoreLocalStorage();
    cy.addProduct(product);
    cy.get(testid`product-inventory-table`)
      .find('tbody tr td:first-of-type span')
      .contains(product.name);
  });

  it('상품을 수정한다', () => {
    cy.restoreLocalStorage();
    const product = {
      name: '사이다',
      price: 1200,
      quantity: 10,
    };
    cy.get(testid`edit-btn`).click();
    cy.input(`product-inventory ${testid`product-name-input`}`, product.name);
    cy.input(`product-inventory ${testid`product-price-input`}`, product.price);
    cy.input(`product-inventory ${testid`product-quantity-input`}`, product.quantity);
    cy.get(testid`confirm-btn`).click();
    cy.get(`product-inventory ${testid`product-name`}`).should('have.text', product.name);
    cy.get(`product-inventory ${testid`product-price`}`).should(
      'have.text',
      product.price.toLocaleString()
    );
    cy.get(`product-inventory ${testid`product-quantity`}`).should(
      'have.text',
      product.quantity.toLocaleString()
    );
  });

  it('상품을 삭제한다', () => {
    cy.restoreLocalStorage();
    cy.get(testid`delete-btn`).click();
    cy.get('product-inventory table').should('not.exist');
  });
});
