Cypress.Commands.add('addProduct', (productName, productPrice, productQuantity) => {
  cy.get('#product-name-input').type(productName);
  cy.get('#product-price-input').type(productPrice);
  cy.get('#product-quantity-input').type(productQuantity);

  return cy.get('#product-input-submit').click();
});

Cypress.Commands.add('rechargeChange', changeInput => {
  cy.get('#recharge-change-input').type(changeInput);
  return cy.get('#recharge-change-form .submit-button').click();
});

Cypress.Commands.add('login', () => {
  cy.get('#login-button').click();

  cy.get('#email-login-input').type('wnsgur8397@naver.com');
  cy.get('#password-login-input').type('960713hj');
  cy.get('#login-form button').click();
});
