import 'cypress-localstorage-commands';

Cypress.Commands.add('login', () => {
  cy.visit('/');

  cy.get('#login-button').click();

  cy.get('#login-form #email').type('abcd@naver.com');
  cy.get('#login-form #password').type('abcd1234!');
  cy.get('#login-form .submit-button').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('.thumbnail .name').click();
  cy.get('.logout-button').click();
});
