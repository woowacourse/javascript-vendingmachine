const { createJSDocTypeExpression } = require('typescript');

describe('첫 방문시 관리자 로그인', () => {
  const Email = `${Date.now()}@test.com`;
  const name = 'Wootech';
  const password = 123123;
  beforeEach(() => {
    cy.visit('http://localhost:9000');
  });

  it('자동로그인 해제', () => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  it('회원 가입 후 로그인 할 수 있다.', () => {
    cy.get('.sign-in-button').click();
    cy.get('.sign-up-button').click();
    cy.get('.sign-up-email-input').type(Email);
    cy.get('.sign-up-name-input').type(name);
    cy.get('.sign-up-pw-input').type(password);
    cy.get('.sign-up-pw-confirm-input').type(password);
    cy.get('.submit-sign-up-button').click();

    cy.get('.sign-in-email-input').type(Email);
    cy.get('.sign-in-pw-input').type(password);
    cy.get('.sign-in-submit-button').click();

    cy.wait(2000);
  });
});

describe('관리자 로그인 이후', () => {
  const Email = `${Date.now()}@test.com`;
  const name = 'Wootech';
  const password = 123123;

  Cypress.Commands.add('registerProduct', (name, price, quantity) => {
    cy.get('#product-name-input').type(name);
    cy.get('#product-price-input').type(price);
    cy.get('#product-quantity-input').type(quantity);
    cy.get('#product-information-submit-btn').click();
  });

  beforeEach('페이지 방문(자동로그인)', () => {
    cy.visit('http://localhost:9000');
  });

  it('물품을 등록하고 관리할 수 있다.', () => {
    cy.get('#product-manage-nav-button').click();
    cy.registerProduct('코카콜라', 1000, 10);

    cy.get('.edit-button').first().click();
    cy.get('.product-quantity').children().first().clear();
    cy.get('.product-quantity').type(15);
    cy.get('.confirm-button').click();

    cy.get('.product-quantity').children().first().should('have.text', 15);

    cy.get('.delete-button').first().click();
    cy.on('window:confirm', () => true);

    cy.get('#product-table-body').children().should('have.length', 0);
  });

  it('물품을 등록하고 구매할 수 있다.', () => {
    cy.get('#product-manage-nav-button').click();
    cy.registerProduct('코카콜라', 1000, 10);
    cy.registerProduct('사이다', 1300, 13);

    cy.get('#product-purchase-nav-button').click();
    cy.get('#customer-money-input').type(5000);
    cy.get('.customer-money-input-btn').click();
    cy.get('.purchase-button').first().click();
    cy.get('.purchase-button').first().click();

    cy.get('.current-balance').should('have.text', 3000);
  });

  it('잔돈을 충전하고 반환버튼을 누를 수 있다.', () => {
    cy.get('#charge-balance-nav-button').click();
    cy.get('#charge-balance-input').type(3000);
    cy.get('.charge-balance-submit-btn').click();

    cy.get('#product-purchase-nav-button').click();
    cy.get('#give-changes-button').click();
  });

  it('회원정보 수정 할 수 있다.', () => {
    cy.get('.edit-information-button').click({ force: true });
    cy.get('.edit-name-input').clear().type(`K${Email}`);
    cy.get('.edit-pw-input').type(password);
    cy.get('.edit-pw-confirm-input').type(password);
    cy.get('.submit-edit-button').click();
    cy.get('.thumbnail').should('have.text', 'K');
  });

  it('로그아웃 할 수 있다.', () => {
    cy.get('.sign-out-button').click({ force: true });
    cy.get('.drop-down-button').should('have.class', 'hide');
  });
});
