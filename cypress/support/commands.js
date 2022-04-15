import { ERROR_MESSAGE } from '../../src/js/constants';

Cypress.Commands.add('login', (userEmail, userPassword) => {
  cy.get('#login-email').clear();
  cy.get('#login-password').clear();
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

Cypress.Commands.add('updateUser', (name, password, passowrdConfirm) => {
  cy.get('#update-user-name').type(name);
  cy.get('#update-user-password').type(password);
  cy.get('#update-user-password-confirm').type(passowrdConfirm);
  cy.get('#update-user-form').submit();
});
