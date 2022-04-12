import 'cypress-wait-until';
import 'cypress-localstorage-commands';

Cypress.Commands.add('login', (email, password) => {
  cy.get('#email-input').type(email);
  cy.get('#password-input').type(password);
  cy.get('button').click();

  cy.waitUntil(() => cy.location('pathname').should('eq', '/dist/manager.html'));
});

Cypress.Commands.add('logout', () => {
  cy.get('#manager-name-button').click();
  cy.get('#logout').click();
});

Cypress.Commands.add('signupAndLogin', (email, name, password) => {
  // 회원가입 페이지 이동
  cy.get('.sign-up-button').click();
  cy.get('.sign-up-link').click();

  // 회원가입
  cy.get('#email-input').type(email);
  cy.get('#name-input').type(name);
  cy.get('#password-input').type(password);
  cy.get('#password-check').type(password);
  cy.get('button').click();

  cy.waitUntil(() => cy.location('pathname').should('eq', '/dist/login.html'));

  cy.login(email, password);
});

Cypress.Commands.add('modifyInfo', (email, name, password) => {
  cy.get('#manager-name-button').click();
  cy.get('#modify-info').click();

  // 회원 정보 수정
  cy.get('#name-input').clear();
  cy.get('#name-input').type(name);
  cy.get('#password-input').type(password);
  cy.get('#password-check').type(password);
  cy.get('#sign-up-info-form button').click();

  cy.waitUntil(() => cy.location('pathname').should('eq', '/dist/login.html'));

  cy.login(email, password);
});

Cypress.Commands.add('chargeUserAmount', (amount) => {
  cy.get('#amount-input').type(amount);
  cy.get('#purchase-form button').click();
});
