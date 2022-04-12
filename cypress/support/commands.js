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

Cypress.Commands.add('login', (id = 'test@test.com', password = 'test123!') => {
  cy.get('.nav__login-button').click();

  cy.get('.login-email-input').type(id);
  cy.get('.login-password-input').type(password);
  return cy.get('.login-button').click();
});

Cypress.Commands.add('changeTab', (tab) => {
  cy.get(`.nav__${tab}-button`).click();
});

Cypress.Commands.add('checkErrorMessage', (message) => {
  cy.get('.snack-bar-container .snack-bar-container__message').should(
    'have.text',
    message
  );
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

Cypress.Commands.add(
  'checkProductInfo',
  (productName, name, price, quantity) => {
    cy.get(`[data-product-name="${productName}"] td`)
      .eq(0)
      .should('have.text', name);
    cy.get(`[data-product-name="${productName}"] td`)
      .eq(1)
      .should('have.text', price);
    cy.get(`[data-product-name="${productName}"] td`)
      .eq(2)
      .should('have.text', `${quantity}개`);
  }
);

Cypress.Commands.add('chargeCoins', (money) => {
  cy.get('.charge-form-section__coin-input').type(money);
  return cy.get('.charge-form-section__button').click();
});

Cypress.Commands.add('chargeMoney', (money) => {
  cy.get('.money-for-purchase-form-section__money-input').type(money);
  return cy.get('.money-for-purchase-form-section__button').click();
});

Cypress.Commands.add('buyProduct', (productName) =>
  cy
    .get(
      `.purchase-section [data-product-name="${productName}"] .product-table__purchase-button`
    )
    .click()
);

Cypress.Commands.add('signup', (email, name, password, passwordConfirm) => {
  cy.get('.signup-email-input').type(email);
  cy.get('.signup-name-input').type(name);
  cy.get('.signup-password-input').type(password);
  cy.get('.signup-password-confirm-input').type(passwordConfirm);

  cy.get('.signup-button').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('.user-thumbnail').click();
  cy.get('.logout-button').click();
});
