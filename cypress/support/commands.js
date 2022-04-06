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

Cypress.Commands.add('setSignIn', () => {
  setCookie(
    'user',
    JSON.stringify({
      id: 1,
      name: '꼬재',
      accessToken:
        '%22%3A%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGZAZ21haWwuY29tIiwiaWF0IjoxNjQ5MjIyODExLCJleHAiOjE2NDkyMjY0MTEsInN1YiI6IjgifQ.4Gdm73HKwY3C2Mqi9nl8GrxLM2pfrb_LStYq3pXXnzM%22%7D',
    }),
    {
      'max-age': 3600,
    }
  );
});

Cypress.Commands.add('setProduct', () => {
  cy.get('.product-info-form__product-input').clear().type('콜라');
  cy.get('.product-info-form__price-input').clear().type('1200');
  cy.get('.product-info-form__quantity-input').clear().type('12');
});

Cypress.Commands.add('setEditProduct', () => {
  cy.get('.product-table__product-name-input--edit').clear().type('사이다');
  cy.get('.product-table__product-price-input--edit').clear().type('2000');
  cy.get('.product-table__product-quantity-input--edit').clear().type('20');
});
