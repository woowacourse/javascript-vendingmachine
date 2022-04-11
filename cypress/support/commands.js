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
