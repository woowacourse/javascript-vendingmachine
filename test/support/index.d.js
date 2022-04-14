import 'cypress-localstorage-commands';

// 자판기에 상품을 추가할 수 있다
Cypress.Commands.add('addProduct', ({ name, price, quantity }) => {
  cy.get('.add-product-input-wrap input[name="name"]').type(name);
  cy.get('.add-product-input-wrap input[name="price"]').type(price);
  cy.get('.add-product-input-wrap input[name="quantity"]').type(quantity);

  cy.get('#add-product-submit-button').click();
});

// 해당 컨텐츠들을 가지고 있어야 한다.
Cypress.Commands.add('includeTextList', { prevSubject: true }, (subject, textList) => {
  textList.forEach(text => {
    const targetSelector = subject.selector;
    cy.get(targetSelector).should('include.text', text);
  });
});

// 특정 폼에 로그인 정보를 입력한다
Cypress.Commands.add(
  'enterUserLoginInfo',
  { prevSubject: true },
  (parentForm, { email, password }) => {
    cy.get(parentForm.selector).get('input[name="email"]').clear().type(email);
    cy.get(parentForm.selector).get('input[name="password"]').clear().type(password);
  },
);
