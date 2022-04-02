Cypress.Commands.add('addProduct', ({ name, price, stock }) => {
  cy.get('#manage-tab-menu').click();
  cy.get('#add-product-name-input').type(name);
  cy.get('#add-product-price-input').type(price);
  cy.get('#add-product-stock-input').type(stock);
  cy.get('.submit-button').click();
});

Cypress.Commands.add('updateProduct', (targetProperty, newData) => {
  cy.get('#manage-tab-menu').click();

  cy.get('.update-product-button').first().click();
  cy.get(`.update-product-${targetProperty}-input`).first().clear().type(newData);
  cy.get('.confirm-update-button').first().click();
});

Cypress.Commands.add('addChange', (money) => {
  cy.get('#charge-tab-menu').click();
  cy.get('#money-input').type(money);
  cy.get('.submit-button').click();
});

Cypress.Commands.add('addMoneyInsert', (moneyInsert) => {
  cy.get('#purchase-tab-menu').click();
  cy.get('#money-insert-input').type(moneyInsert);
  cy.get('.submit-button').click();
});
