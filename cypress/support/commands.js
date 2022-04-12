Cypress.Commands.add("signUp", ({ email, name, password, confirmPassword }) => {
  cy.get("#email").type(email);
  cy.get("#name").type(name);
  cy.get("#password").type(password);
  cy.get("#confirm-password").type(confirmPassword);
  cy.get(".submit-button").click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".submit-button").click();
});
