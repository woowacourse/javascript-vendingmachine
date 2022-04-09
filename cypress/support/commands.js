Cypress.Commands.add("login", (email, password) => {
  cy.get("login-status").click();
  cy.get("#login-email-input").type(email);
  cy.get("#login-password-input").type(password);

  cy.get(".login-button").click();
});

Cypress.Commands.add("logout", () => {
  cy.get("login-status").shadow().find("#user-profile").click();
  cy.get("login-status").shadow().find("#logout-button").click();
});

Cypress.Commands.add("signup", (email, password, name) => {
  cy.get("login-status").click();

  cy.get("a").click();
  cy.get("#signup-email").type(email);
  cy.get("#signup-name").type(name);
  cy.get("#signup-password").type(password);
  cy.get("#signup-password-confirm").type(password);
  cy.get(".button").click();
});

Cypress.Commands.add("userEdit", (name, password) => {
  cy.get("login-status").shadow().find("#user-profile").click();
  cy.get("login-status")
    .shadow()
    .find(".user-menu-list")
    .find("li")
    .first()
    .click();

  cy.get("#edit-user-name").clear().type(name);
  cy.get("#edit-user-password").type(password);
  cy.get("#edit-user-password-confirm").type(password);
  cy.get(".button").click();
});
