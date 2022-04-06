Cypress.Commands.add('login', () => {
  const email = '604jhy@naver.com';
  const password = 'asdqwe123!';

  cy.get('login-header button').click();
  cy.get('[name=email]').type(email);
  cy.get('[name=password]').type(password);
  cy.get('login-form button').click();
});

Cypress.Commands.add('addProduct', (name, price, quantity) => {
  cy.get('[data-destination=product-manage-tab]').click();
  cy.wait(500);

  cy.get('[name=product-name]').type(name);
  cy.get('[name=product-price]').type(price);
  cy.get('[name=product-quantity]').type(quantity);
  cy.get('form button').click();
});

Cypress.Commands.add('insertMoney', (money) => {
  cy.get('[data-destination=purchase-product-tab]').click();
  cy.wait(500);

  cy.get('purchase-product-form input').type(money);
  cy.get('purchase-product-form button').click();
});
