import { AUTH_BASE_URL, BASE_HASH } from '../../src/constants';

Cypress.Commands.add('shouldBaseHash', () => {
  cy.hash().should('eq', BASE_HASH);
  cy.get('product-purchase-container').should('be.visible');
});

Cypress.Commands.add('showCustomerScreen', () => {
  cy.shouldBaseHash();

  cy.get('.login-button').should('be.visible');
  cy.get('.user-button').should('not.be.visible');

  cy.get('administrator-menu').should('not.be.visible');
});

Cypress.Commands.add('showDefaultAdministratorScreen', (userNameFirstChar) => {
  cy.shouldBaseHash();

  cy.get('.user-button').should('be.visible');
  cy.get('.user-button').should('have.text', userNameFirstChar);
  cy.get('.login-button').should('not.be.visible');

  cy.get('administrator-menu').should('be.visible');
});

Cypress.Commands.add('signup', ({ email, name, password }) => {
  cy.intercept({
    method: 'POST',
    url: `${AUTH_BASE_URL}/register`,
  }).as('administratorRegister');

  cy.get('#signup-email').type(email);
  cy.get('#signup-name').type(name);
  cy.get('#signup-password').type(password);
  cy.get('#signup-password-confirm').type(password).type('{enter}');

  cy.wait('@administratorRegister');
});

Cypress.Commands.add('login', ({ email, password }) => {
  cy.intercept({
    method: 'POST',
    url: `${AUTH_BASE_URL}/login`,
  }).as('administratorLogin');

  cy.hash().should('eq', '#!login');
  cy.get('log-in').should('be.visible');
  cy.get('#login-email').type(email);
  cy.get('#login-password').type(password).type('{enter}');

  cy.wait('@administratorLogin');
});

Cypress.Commands.add('typeAddProductInputs', ({ name, price, quantity }) => {
  cy.get('.product-name-input').type(name);
  cy.get('.product-price-input').type(price);
  cy.get('.product-quantity-input').type(quantity).type('{enter}');
});

Cypress.Commands.add('typeModifyUserInfoInputs', ({ name, password }) => {
  cy.get('#user-info-modify-name').type(name);
  cy.get('#user-info-modify-password').type(password);
  cy.get('#user-info-modify-password-confirm').type(password).type('{enter}');
});
