import { testid } from '../support/utils';

describe('상품을 관리 한다 - 성공케이스', () => {
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

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.removeProducts();
  });

  it('상품을 추가한다', () => {
    cy.addProduct(product);
    cy.get(testid`product-inventory-table`)
      .find('tbody tr td:first-of-type span')
      .contains(product.name);
  });

  it('상품을 수정한다', () => {
    const product = {
      name: '사이다',
      price: 1150,
      quantity: 8,
    };
    cy.addProduct(product);
    cy.editProduct(0, false, product);
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
    cy.addProduct(product);
    cy.get(testid`delete-btn`).click();
    cy.get('product-inventory table').should('not.exist');
  });
});
