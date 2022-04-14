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
import {
  VALID,
  SET_PRODUCT,
  SET_EDIT_PRODUCT,
} from '../integration/testConstant';
import pickRandomIndex from '../../src/ts/utils/utils';

Cypress.Commands.add('setSignIn', () => {
  const randomEmail = `${pickRandomIndex(0, 1000000000)}@gmail.com`;

  cy.get('.sign-in-button').click();
  cy.get('.sign-in-section__sign-up-button').click();

  cy.get('.sign-up-form__email-input').clear().type(randomEmail);
  cy.get('.sign-up-form__name-input').clear().type(VALID.NAME);
  cy.get('.sign-up-form__password-input').clear().type(VALID.PASSWORD);
  cy.get('.sign-up-form__password-confirm-input').clear().type(VALID.PASSWORD);
  cy.wait(2000);
  cy.get('.sign-up-form__verify-button').click();

  cy.get('.sign-in-form__email-input').clear().type(randomEmail);
  cy.get('.sign-in-form__password-input').clear().type(VALID.PASSWORD);

  cy.get('.sign-in-form__verify-button').click();
});

Cypress.Commands.add('setProduct', () => {
  cy.get('.product-info-form__product-input')
    .clear()
    .type(SET_PRODUCT.PRODUCT_NAME);
  cy.get('.product-info-form__price-input')
    .clear()
    .type(SET_PRODUCT.PRODUCT_PRICE);
  cy.get('.product-info-form__quantity-input')
    .clear()
    .type(SET_PRODUCT.PRODUCT_QUANTITY);
});

Cypress.Commands.add('setEditProduct', () => {
  cy.get('.product-table__product-name-input--edit')
    .clear()
    .type(SET_EDIT_PRODUCT.PRODUCT_NAME);
  cy.get('.product-table__product-price-input--edit')
    .clear()
    .type(SET_EDIT_PRODUCT.PRODUCT_PRICE);
  cy.get('.product-table__product-quantity-input--edit')
    .clear()
    .type(SET_EDIT_PRODUCT.PRODUCT_QUANTITY);
});
