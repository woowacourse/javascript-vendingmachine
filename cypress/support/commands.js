import { getRandomNumber } from '../../src/ts/utils.ts';

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

Cypress.Commands.add('insertMoney', (money) => {
  cy.get('#insert-money-input').type(money);
  cy.get('#insert-button').click();
});

Cypress.Commands.add('checkToastMessage', (message) => {
  cy.get('toast-modal').invoke('attr', 'message').should('eq', message);
});

Cypress.Commands.add('rechargeMoney', (money) => {
  const baseUrl = '/index.html';
  localStorage.setItem('money', JSON.stringify(money));
  cy.visit(baseUrl);
});

Cypress.Commands.add('enterUserPage', () => {
  const baseUrl = '/index.html';
  const email = `${getRandomNumber(0, 10000000)}@gmail.com`;
  const password = 'goodpass123!';
  const name = '마르코';
  cy.signup(email, name, password, password);
  cy.get('log-in').shadow().find('#email-input').type(email);
  cy.get('log-in').shadow().find('#password-input').type(password, { force: true });
  cy.get('log-in').shadow().find('button').click();
});

Cypress.Commands.add('editProduct', (editedProduct) => {
  cy.get('#edit-name-input').clear().type(editedProduct.name);
  cy.get('#edit-price-input').clear().type(editedProduct.price);
  cy.get('#edit-quantity-input').clear().type(editedProduct.quantity);
  cy.get('.edit-confirm-button').click();
});

Cypress.Commands.add('shouldHaveProductTable', (product) => {
  cy.get('.product-row-name').last().should('have.text', product.name);
  cy.get('.product-row-price').last().should('have.text', product.price);
  cy.get('.product-row-quantity').last().should('have.text', product.quantity);
});
