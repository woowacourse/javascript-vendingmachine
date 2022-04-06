Cypress.Commands.add('signup', (email, name, password, passwordCheck) => {
  cy.get('user-menu').shadow().find('#login-button').click();
  cy.get('log-in').shadow().find('#signup-span').click();

  cy.get('sign-up').shadow().find('#email-input').type(email);
  cy.get('sign-up').shadow().find('#name-input').type(name, { force: true });
  cy.get('sign-up').shadow().find('#password-input').type(password, { force: true });
  cy.get('sign-up').shadow().find('#password-check-input').type(passwordCheck, { force: true });
  cy.get('sign-up').shadow().find('button').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('user-menu').shadow().find('#login-button').click();
  cy.get('log-in').shadow().find('#email-input').type(email);
  cy.get('log-in').shadow().find('#password-input').type(password, { force: true });
  cy.get('log-in').shadow().find('button').click();
});
