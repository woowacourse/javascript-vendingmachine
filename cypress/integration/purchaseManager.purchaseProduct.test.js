const { ERROR_MESSAGE } = require('../../src/ts/constants');

describe('상품 구매 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
  });

  it('충전 금액이 상품 가격보다 높고, 상품이 남아 있다면 상품을 구매할 수 있다.', () => {
    const productName = '콜라';
    const price = 1000;
    const quantity = 1;

    cy.wait(1500);
    cy.addProduct(productName, price, quantity);

    cy.changeTab('purchase');

    const chargeMoney = 2000;
    cy.chargeMoney(chargeMoney);

    cy.buyProduct(productName);

    cy.get(`.purchase-section [data-product-name="${productName}"] td`)
      .eq(2)
      .should('have.text', `${quantity - 1}개`);
    cy.get('.money-for-purchase-section__total-money').should(
      'have.text',
      chargeMoney - price
    );
  });

  it('충전 금액이 상품 가격보다 낮으면 에러 메시지를 보여준다.', () => {
    const productName = '콜라';
    const price = 2000;
    const quantity = 1;

    cy.wait(1500);
    cy.addProduct(productName, price, quantity);

    cy.changeTab('purchase');

    const chargeMoney = 1000;
    cy.chargeMoney(chargeMoney);

    cy.buyProduct(productName).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
    });
  });

  it('남은 상품 수량이 없다면 에러 메시지를 보여준다.', () => {
    const productName = '콜라';
    const price = 1000;
    const quantity = 1;

    cy.wait(1500);
    cy.addProduct(productName, price, quantity);

    cy.changeTab('purchase');

    const chargeMoney = 2000;
    cy.chargeMoney(chargeMoney);

    cy.buyProduct(productName);
    cy.buyProduct(productName).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.SOLD_OUT_PRODUCT);
    });
  });
});
