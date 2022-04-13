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
import { setCookie } from '../../src/ts/cookie/cookie';
import { SET_PRODUCT, SET_EDIT_PRODUCT } from '../integration/testConstant';
import { COOKIE_ID } from '../../src/ts/constants/cookie';

Cypress.Commands.add('setSignIn', () => {
  setCookie(
    COOKIE_ID.USER,
    JSON.stringify({
      id: 1,
      name: '꼬재',
      accessToken:
        '%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAZ21haWwuY29tIiwiaWF0IjoxNjQ5MjIyODExLCJleHAiOjE2NDkyMjY0MTEsInN1YiI6IjgifQ.4Gdm73HKwY3C2Mqi9nl8GrxLM2pfrb_LStYq3pXXnzM%22%7D',
    }),
    3600
  );
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
