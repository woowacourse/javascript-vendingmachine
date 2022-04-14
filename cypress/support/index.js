import { WhiteList } from '../../src/constants';
import { testid } from './utils';

// solution for preserve localStorage between tests.
// ref : https://github.com/cypress-io/cypress/issues/461#issuecomment-392070888
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('register', (email, name, password) => {
  cy.visit(WhiteList.RegisterPage);
  cy.get(testid`email-input`).type(`${email}`);
  cy.get(testid`name-input`).type(name);
  cy.get(testid`password-input`).type(`${password}`);
  cy.get(testid`repassword-input`).type(`${password}`);
  cy.get(testid`register-btn`).click();
  cy.url().should('contain', WhiteList.LoginPage);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit(WhiteList.LoginPage);
  cy.get(testid`email-input`).type(`${email}`);
  cy.get(testid`password-input`).type(`${password}`);
  cy.get(testid`login-btn`).click();
  cy.wait(1000);
  cy.saveLocalStorage();
  cy.url().should('contain', WhiteList.Home);
});

Cypress.Commands.add('addProduct', ({ name, price, quantity }) => {
  cy.get(testid`product-manage-link`).click();
  cy.input(testid`product-name-input`, name);
  cy.input(testid`product-price-input`, price);
  cy.input(testid`product-quantity-input`, quantity);
  cy.get(testid`add-product-btn`).click();
});

Cypress.Commands.add('editProduct', (index, shouldCancel, { name, price, quantity }) => {
  cy.get(testid`product-manage-link`).click();
  console.log('index : ', index);
  const parent = `product-inventory tr:nth-of-type(${index + 1})`;
  cy.get(`${parent} ${testid`edit-btn`}`).click();
  cy.input(`${parent} ${testid`product-name-input`}`, name);
  cy.input(`${parent} ${testid`product-price-input`}`, price);
  cy.input(`${parent} ${testid`product-quantity-input`}`, quantity);
  cy.get(`${parent} ${testid`confirm-btn`}`).click();
  if (shouldCancel) cy.get(`${parent} ${testid`cancel-btn`}`).click();
});

Cypress.Commands.add('chargeMoney', (money) => {
  cy.get(testid`charge-money-link`).click();
  money && cy.get(testid`charge-money-input`).type(money);
  cy.get(testid`charge-money-btn`).click();
});

Cypress.Commands.add('insertMoney', (money) => {
  cy.get(testid`purchase-product-link`).click();
  cy.input(testid`insert-money-input`, money);
  cy.get(testid`insert-money-btn`).click();
});

Cypress.Commands.add('purchaseProduct', () => {
  cy.get(testid`purchase-product-link`).click();
  cy.get(testid`product-menu`).find('tbody tr td:first-of-type');
});

Cypress.Commands.add('releaseCoin', () => {
  cy.get(testid`purchase-product-link`).click();
  cy.get(testid`release-coin`).click();
});

Cypress.Commands.add('input', (selector, value) => {
  value ? cy.get(`${selector}`).clear().type(value) : cy.get(`${selector}`).clear();
});

Cypress.Commands.add('clearToast', () => {
  cy.get(`side-toast`).then(($el) => {
    console.log($el);
    $el[0].clear();
  });
});

Cypress.Commands.add('checkToastErrorMessage', (message) => {
  cy.get(`side-toast ${testid`error-toast-message`}`).should('have.text', message);
});

Cypress.Commands.add('findProduct', (name) => {
  cy.get('product-inventory tbody tr').each(($tr, index) => {
    const productName = $tr
      .find(testid`product-name`)
      .text()
      .trim();
    if (productName !== name) return;
    cy.wrap(index).as('productIndex');
  });
});

Cypress.Commands.add('removeProducts', () => {
  cy.get('body').then(($el) => {
    const $deleteBtn = $el.find(testid`delete-btn`);
    $deleteBtn.length > 0 && cy.wrap($deleteBtn[0]).click();
  });
});
