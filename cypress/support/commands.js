import ProductAPI from '../../src/js/api/productAPI';

Cypress.Commands.add('interceptAdminRequest', () => {
  cy.intercept('GET', ProductAPI.BASE_URL + ProductAPI.TYPES.PRODUCTS, {
    fixture: 'productListDataResponse.json',
  }).as('productListDataRequest');

  cy.intercept('POST', ProductAPI.BASE_URL + ProductAPI.TYPES.PRODUCTS, {
    fixture: 'responseOK.json',
  }).as('productAddRequest');

  cy.intercept('PATCH', ProductAPI.BASE_URL + ProductAPI.TYPES.PRODUCTS + '/*', {
    fixture: 'editedProductData.json',
  }).as('productUpdateRequest');

  cy.intercept('DELETE', ProductAPI.BASE_URL + ProductAPI.TYPES.PRODUCTS + '/*', {
    fixture: 'responseOK.json',
  }).as('deleteProductRequest');

  cy.intercept('GET', ProductAPI.BASE_URL + ProductAPI.TYPES.MONEY, {
    fixture: 'moneyDataResponse.json',
  }).as('moneyDataRequest');

  cy.intercept('PATCH', ProductAPI.BASE_URL + ProductAPI.TYPES.MONEY, {
    fixture: 'responseOK.json',
  }).as('moneyUpdateRequest');
});
