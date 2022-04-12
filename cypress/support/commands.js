Cypress.Commands.add('signupFormClear', () => {
  cy.get('#signup-form__email').clear();
  cy.get('#signup-form__name').clear();
  cy.get('#signup-form__password').clear();
  cy.get('#signup-form__password-confirm').clear();
});

Cypress.Commands.add('signinFormClear', () => {
  cy.get('#signin-form__email').clear();
  cy.get('#signin-form__password').clear();
});

Cypress.Commands.add('typeSignupForm', (email, name, password, passwordConfirm) => {
  cy.get('#signup-form__email').type(email);
  cy.get('#signup-form__name').type(name);
  cy.get('#signup-form__password').type(password);
  cy.get('#signup-form__password-confirm').type(passwordConfirm);
});

Cypress.Commands.add('typeSigninForm', (email, password) => {
  cy.get('#signin-form__email').type(email);
  cy.get('#signin-form__password').type(password);
});

Cypress.Commands.add('inputMoney', (money) => {
  cy.get('.purchase-form__money-input').type(money);
  cy.get('.purchase-form__money-input-button').click();
});
