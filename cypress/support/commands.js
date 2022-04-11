const getEditButtonSelector = (productName) =>
  `[data-product-name="${productName}"] .product-table__edit-button`;
const getEditSubmitButtonSelector = (productName) =>
  `[data-product-name="${productName}"] .product-table__confirm-button`;

const getEditInputSelector = (select) =>
  `.product-table__product-${select}-input--edit`;
const getEditProductNameInputSelector = (productName) =>
  `[data-product-name="${productName}"] ${getEditInputSelector('name')}`;
const getEditProductPriceInputSelector = (productName) =>
  `[data-product-name="${productName}"] ${getEditInputSelector('price')}`;
const getEditProductQuantityInputSelector = (productName) =>
  `[data-product-name="${productName}"] ${getEditInputSelector('quantity')}`;

Cypress.Commands.add('login', () => {
  cy.get('.nav__login-button').click();

  cy.get('.login-email-input').type('kwannee@abc.com');
  cy.get('.login-password-input').type('kwannee123');
  cy.get('.login-button').click();
});

Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('.products-form__product-input').type(name);
  cy.get('.products-form__price-input').type(price);
  cy.get('.products-form__quantity-input').type(quantity);

  return cy.get('.products-form__button').click();
});

Cypress.Commands.add(
  'editProduct',
  (productName, editName, editPrice, editQuantity) => {
    cy.get(getEditButtonSelector(productName)).click();

    cy.get(getEditProductNameInputSelector(productName)).clear().type(editName);
    cy.get(getEditProductPriceInputSelector(productName))
      .clear()
      .type(editPrice);
    cy.get(getEditProductQuantityInputSelector(productName))
      .clear()
      .type(editQuantity);

    return cy.get(getEditSubmitButtonSelector(productName)).click();
  }
);
