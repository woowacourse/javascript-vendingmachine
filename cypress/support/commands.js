// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

import { ERROR_MESSAGE } from '../../src/js/constants';

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (userEmail, userPassword) => {
  cy.get('#to-login-anchor').click();
  cy.get('#login-email').type(userEmail);
  cy.get('#login-password').type(userPassword);

  cy.get('#login-form').submit();
});

Cypress.Commands.add('addProduct', (name, price, stock) => {
  cy.get('#add-product-name-input').type(name);
  cy.get('#add-product-price-input').type(price);
  cy.get('#add-product-stock-input').type(stock);
  cy.get('#add-product-form').submit();
});

Cypress.Commands.add('addChange', (money) => {
  cy.get('#money-input').type(money);
  cy.get('#add-change-form').submit();
});

Cypress.Commands.add('inputMoney', (money) => {
  cy.get('#money-input').type(money);
  cy.get('#purchase-product-form').submit();
});

Cypress.Commands.add('signUp', (email, name, password, passwordConfirm) => {
  cy.get('#sign-up-email').clear();
  cy.get('#sign-up-name').clear();
  cy.get('#sign-up-password').clear();
  cy.get('#sign-up-password-confirm').clear();
  cy.get('#sign-up-email').type(email);
  cy.get('#sign-up-name').type(name);
  cy.get('#sign-up-password').type(password);
  cy.get('#sign-up-password-confirm').type(passwordConfirm);

  cy.get('#sign-up-form').submit();
});

Cypress.Commands.add('authorizeInNotLogin', (path) => {
  cy.visit(path);
  cy.get('h1').should('have.text', '로그인');
  cy.get('#snackbar').should('have.text', ERROR_MESSAGE.NOT_LOGIN);
});

Cypress.Commands.add('authorizeInLogin', (path) => {
  cy.visit(path);
  cy.get('#snackbar').should('have.text', ERROR_MESSAGE.ALREADY_LOGGINED);
  cy.get('#purchase-tab-menu').should('have.class', 'current');
});
