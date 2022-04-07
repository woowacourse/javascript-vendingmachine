Cypress.Commands.add("login", () => {
  cy.get(".header__login-button").click();
  cy.get(".login-form__email-input").type("koy@koy.com");
  cy.get(".login-form__password-input").type("aaaaaa1!");
  cy.get(".login-form__confirm-button").click();
});
