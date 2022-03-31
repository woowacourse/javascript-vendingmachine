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

Cypress.Commands.add('addItem', (itemName, itemPrice, itemQuantity) => {
  cy.get('.item-info-input').eq(0).type(itemName);
  cy.get('.item-info-input').eq(1).type(itemPrice);
  cy.get('.item-info-input').eq(2).type(itemQuantity);
  cy.get('.input-form-button').click();
});

Cypress.Commands.add('rechargeCoin', (cashInput) => {
  cy.get('.cash-charge-input').clear().type(cashInput);
  cy.get('.input-form-button').click();
});

Cypress.Commands.add('checkChargedAmount', (expectedChargedAmount) => {
  cy.get('#charged-amount').should('have.text', expectedChargedAmount);
});

Cypress.Commands.add('checkInvalidInputCount', (expectedInvalidInputCount) => {
  cy.get('input:invalid').should('have.length', expectedInvalidInputCount);
});
