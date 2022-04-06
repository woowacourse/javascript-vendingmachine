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

Cypress.Commands.add('rechargeCoin', () => {
  const vendingMachineCharge = 5000;

  cy.get('#recharge-change-tab').click();

  cy.get('#recharge-change-input').type(vendingMachineCharge);
  cy.get('#recharge-change-form').submit();
  cy.get('#purchase-product-tab').click();
});

Cypress.Commands.add('getReturnChange', () => {
  const charge = 3000;
  cy.get('#charge-input').type(charge);
  cy.get('#charge-input-form').submit();
  cy.get('.product-purchase-button').click();

  const changeCharge = charge - 1500;

  cy.get('#return-change-button').click();
  cy.get('#return-change-table span').then($els => {
    const [coin500, coin100, coin50, coin10] = [...$els].map(el => el.textContent);
    const expectedChangeTotal =
      Number(coin500) * 500 + Number(coin100) * 100 + Number(coin50) * 50 + Number(coin10) * 10;

    expect(expectedChangeTotal).to.equal(changeCharge);
  });
});
