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

import { HASH } from '../../src/ts/constant/path';
import { SELECTOR, SELECTOR_NAME } from '../../src/ts/constant/selector';

Cypress.Commands.add('register', (email, name, password, confirmPassword) => {
  cy.visit(`/${HASH.REGISTER_USER}`);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(0).type(email);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(1).type(name);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(2).type(password);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(3).type(confirmPassword);
  cy.get(SELECTOR.INPUT_FORM_BUTTON).click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit(`/${HASH.LOGIN_USER}`);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(0).type(email);
  cy.get(`${SELECTOR.USER_INFO_FORM} > input`).eq(1).type(password);
  cy.get(SELECTOR.INPUT_FORM_BUTTON).click();
});

Cypress.Commands.add('addItem', (itemName, itemPrice, itemQuantity) => {
  cy.get(SELECTOR.ITEM_INFO_INPUT).eq(0).type(itemName);
  cy.get(SELECTOR.ITEM_INFO_INPUT).eq(1).type(itemPrice);
  cy.get(SELECTOR.ITEM_INFO_INPUT).eq(2).type(itemQuantity);
  cy.get(SELECTOR.INPUT_FORM_BUTTON).click();
});

Cypress.Commands.add('chargeCoin', (cashInput) => {
  cy.get(SELECTOR.CASH_CHARGE_INPUT).clear().type(cashInput);
  cy.get(SELECTOR.INPUT_FORM_BUTTON).click();
});

Cypress.Commands.add('insertMoney', (moneyInput) => {
  cy.get(SELECTOR.ITEM_PURCHASE_INPUT).type(moneyInput);
  cy.get(SELECTOR.INPUT_FORM_BUTTON).click();
});

Cypress.Commands.add('purchaseItem', () => {
  cy.get(SELECTOR.PURCHASE_ITEM_BUTTON).eq(0).click();
});

Cypress.Commands.add('checkInvalidInput', (numberOfInvalidInput) => {
  cy.get('input:invalid').should('have.length', numberOfInvalidInput);
});

Cypress.Commands.add('checkSnackbarVisibility', () => {
  cy.get(SELECTOR.SNACKBAR).should('have.class', SELECTOR_NAME.SHOW);
});
