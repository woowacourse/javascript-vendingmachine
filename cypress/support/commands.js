Cypress.Commands.add("login", () => {
  cy.get(".header__login-button").click();
  cy.get(".login-form__email-input").type("koy@koy.com");
  cy.get(".login-form__password-input").type("aaaaaa1!");
  cy.get(".login-form__confirm-button").click();
});

Cypress.Commands.add("addProduct", (productName, price, quantity) => {
  cy.get(".product-manage__name-input").type(productName);
  cy.get(".product-manage__price-input").type(price);
  cy.get(".product-manage__quantity-input").type(quantity);
  cy.get(".product-manage__add-button").click();
});

Cypress.Commands.add("addPurchaseAmount", (amount) => {
  cy.get(".purchase-form__input").type(amount);
  cy.get(".purchase-form__add-button").click();
});
