import { SELECTOR } from "../constants";

Cypress.Commands.add("signUp", ({ email, name, password, confirmPassword }) => {
  cy.get(SELECTOR.EMAIL_INPUT).type(email);
  cy.get(SELECTOR.NAME_INPUT).type(name);
  cy.get(SELECTOR.PASSWORD_INPUT).type(password);
  cy.get(SELECTOR.CONFIRM_PASSWORD_INPUT).type(confirmPassword);
  cy.get(SELECTOR.SUBMIT_BUTTON).click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.get(SELECTOR.EMAIL_INPUT).type(email);
  cy.get(SELECTOR.PASSWORD_INPUT).type(password);
  cy.get(SELECTOR.SUBMIT_BUTTON).click();
});
