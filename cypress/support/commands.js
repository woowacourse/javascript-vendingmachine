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
