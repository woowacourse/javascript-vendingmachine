/* eslint-disable no-undef */
Cypress.Commands.add('login', () => {
  cy.get('.login').click();

  cy.get('#login-email').type('tn@naver.com');
  cy.get('#login-password').type('vmfhsxm4rl!');
  cy.get('.submit-button').click();
});
