import { API } from '../../src/constatns/auth-constants';

Cypress.Commands.add('login', () => {
  const email = 'asdqwe@naver.com';
  const password = 'asdqwe123!';

  cy.intercept('POST', `${API}/login`, { fixture: 'response-ok' }).as('login');
  cy.get('login-header button').click();
  cy.get('[name=email]').type(email);
  cy.get('[name=password]').type(password);
  cy.get('login-form button').click();
  cy.wait('@login');
});

Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('[data-destination=product-manage-tab]').click();

  cy.get('[name=product-name]').type(name);
  cy.get('[name=product-price]').type(price);
  cy.get('[name=product-quantity]').type(quantity);
  cy.get('form button').click();
});

Cypress.Commands.add('insertMoney', (money) => {
  cy.get('[data-destination=purchase-product-tab]').click();

  cy.get('purchase-product-form input').type(money);
  cy.get('purchase-product-form button').click();
});

Cypress.Commands.add('signUp', (email, name, password) => {
  cy.intercept('POST', `${API}/register`, { fixture: 'response-ok' }).as('signUp');
  cy.get('login-header button').click();
  cy.get('.sign-up-link').click();
  cy.get('[name=email]').type(email);
  cy.get('[name=name]').type(name);
  cy.get('[name=password]').type(password);
  cy.get('[name=confirm-password]').type(password);
  cy.get('.signup-form button').click();
  cy.wait('@signUp');
});
