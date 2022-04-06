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

Cypress.Commands.add('login', (userEmail, userPassword) => {
  cy.get('#login-page-button').click();
  cy.get('#email-input').type(userEmail);
  cy.get('#password-input').type(userPassword);
  cy.get('#login-button').click();
});

Cypress.Commands.add('addProduct', (productName, productPrice, productAmount) => {
  cy.get('#product-name-input').clear().type(productName);
  cy.get('#product-price-input').clear().type(productPrice);
  cy.get('#product-amount-input').clear().type(productAmount);

  cy.get('#product-add-button').click();
});
