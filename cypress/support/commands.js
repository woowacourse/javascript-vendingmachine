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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signup', ({ email, name, password, passwordConfirm }) => {
  cy.intercept('POST', 'http://localhost:5000/**').as('post');
  cy.get('#signup-email').type(email);
  cy.get('#signup-name').type(name);
  cy.get('#signup-password').type(password);
  cy.get('#signup-password-confirm').type(passwordConfirm);
  cy.get('#signup-submit').click();
  cy.wait('@post');
});
Cypress.Commands.add('login', ({ email, password }) => {
  cy.intercept('POST', 'http://localhost:5000/**').as('post');
  cy.get('#login-email').type(email);
  cy.get('#login-password').type(password);
  cy.get('#login-submit').click();
  cy.wait('@post');
});

Cypress.Commands.add('logout', () => {
  cy.get('#user-thumbnail').click();
  cy.get('#logout-link').click();
});

Cypress.Commands.add('addItem', ({ name, price, quantity }) => {
  cy.get('#item-name-input').type(name);
  cy.get('#item-price-input').type(price);
  cy.get('#item-quantity-input').type(quantity);
  cy.get('#add-item-button').click();
});

Cypress.Commands.add('chargeChange', (amount) => {
  cy.get('#charge-amount').type(amount);
  cy.get('#add-charge-button').click();
});
