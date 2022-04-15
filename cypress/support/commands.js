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

Cypress.Commands.add('checkInvalidInputCount', (expectedInvalidInputCount) => {
  cy.get('input:invalid').should('have.length', expectedInvalidInputCount);
});

Cypress.Commands.add('addItem', (itemName, itemPrice, itemQuantity) => {
  cy.get('.item-info-input').eq(0).type(itemName);
  cy.get('.item-info-input').eq(1).type(itemPrice);
  cy.get('.item-info-input').eq(2).type(itemQuantity);
  cy.get('.input-form-button').click();
});

Cypress.Commands.add('checkAddedItem', (expectedItemName) => {
  cy.get('tr').eq(1).should('have.attr', 'data-item-name', expectedItemName);
});

Cypress.Commands.add('checkItemNotAdded', () => {
  const initialTrCount = 1;

  cy.get('tr').should('have.length', initialTrCount);
});

Cypress.Commands.add('editItemInfo', (inputIndex, editedInfo) => {
  cy.get('.edit-item-button').click();
  cy.get('.item-info-input-cell').eq(inputIndex).clear().type(editedInfo);
  cy.get('.confirm-item-button').click();
});

Cypress.Commands.add('rechargeCoin', (cashInput) => {
  cy.get('.cash-charge-input').clear().type(cashInput);
  cy.get('.input-form-button').click();
});

Cypress.Commands.add('checkChargedAmount', (expectedChargedAmount) => {
  cy.get('#charged-amount').should('have.text', expectedChargedAmount);
});

Cypress.Commands.add('login', () => {
  const LOGIN_API_URL = 'http://localhost:3000/login';
  const email = 'woowa@gmail.com';
  const password = '1234abcd!';

  cy.intercept(LOGIN_API_URL, { fixture: 'loginData.json' }).as('login');
  cy.visit('/');

  cy.get('.login-button').click();

  cy.get('#login-email').type(email);
  cy.get('#login-password').type(password);
  cy.get('.authentication-button').click();

  cy.wait('@login');
});
