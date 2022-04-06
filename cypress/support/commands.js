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

Cypress.Commands.add('login', (userEmail, userPassword) => {
  cy.get('#login-button').click();
  cy.get('#login-email-input').type(userEmail);
  cy.get('#login-password-input').type(userPassword);

  cy.get('#login-form').submit();
});

Cypress.Commands.add('signIn', (userEmail, userName, userPassword) => {
  cy.get('#login-button').click();
  cy.get('#signup-href').click();
  cy.get('#sign-in-email-input').type(userEmail);
  cy.get('#sign-in-name-input').type(userName);
  cy.get('#sign-in-password-input').type(userPassword);
  cy.get('#sign-in-password-confirm-input').type(userPassword);

  return cy.get('#sign-in-form').submit();
});
