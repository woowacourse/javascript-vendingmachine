import { ERROR_MSG } from '../../src/utils/constants';

describe('상품을 구매할 수 있다', () => {
  beforeEach(() => {
    cy.visit('/');
    const userEmail = '789456@name.com';
    const userPassword = '1234asdf!@#$';

    cy.login(userEmail, userPassword);
    cy.get('#manage-product-tab').click();

    const productName = '콜라';
    const productPrice = 1500;
    const productQuantity = 3;

    cy.addProduct(productName, productPrice, productQuantity);
    cy.get('#purchase-product-tab').click();
  });

  it('입력할 구매할 금액이 10 이상 10000 이하가 아닐 경우 alert를 띄운다', () => {
    const wrongCharge = 10010;

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#charge-input').type(wrongCharge);
    cy.get('#charge-input-form')
      .submit()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MSG.CHARGE_OUT_OF_RANGE);
      });
  });

  it('상품을 구매한 후 투입한 금액이 상품 금액만큼 줄어든다', () => {
    const charge = 10000;
    cy.get('#charge-input').type(charge);
    cy.get('#charge-input-form').submit();
    cy.get('.product-purchase-button').click();
    cy.get('#input-total-amount').should('have.text', '8500');
  });

  it('상품을 구매한 후 반환하기 버튼을 누르면 자판기가 가지고 있는 동전에서 잔돈을 반환한다', () => {
    cy.rechargeCoin();

    cy.getReturnChange();
  });

  it('잔돈을 반환받을 때에, 자판기 보유 동전이 0이고 유저의 보유금액이 있을 경우 alert를 호출한다', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    const charge = 10000;
    cy.get('#charge-input').type(charge);
    cy.get('#charge-input-form').submit();
    cy.get('#return-change-button')
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MSG.OUT_OF_CHANGE);
      });
  });

  it('로그아웃을 하여도 상품구매를 할 수 있다', () => {
    cy.rechargeCoin();
    cy.get('#user-profile').click();
    cy.get('#logout-button').click();

    cy.getReturnChange();
  });
});
