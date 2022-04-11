Cypress.Commands.add('login', (email, password) => {
  cy.get('.login-button').click();
  cy.get('#login-email').type(email);
  cy.get('#login-password').type(password);
  cy.get('.login-confirm-button').click();
});

Cypress.Commands.add('addItem', (itemName, price, quantity) => {
  cy.get('#item-management').click();
  cy.get('#item-name-input').type(itemName);
  cy.get('#item-price-input').type(price);
  cy.get('#item-quantity-input').type(quantity);
  cy.get('.add-item-button').click();
});
