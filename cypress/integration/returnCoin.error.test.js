import { ERROR_MSG } from '../../src/utils/constants';

describe('금액 반환 예외사항 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.addProduct('콜라', 1500, 10);
    cy.get('#recharge-change-tab').click();
    cy.rechargeChange(0);
    cy.get('#purchase-product-tab').click();
  });

  it('자판기에 동전이 없는 경우 반환받을 수 없다.', () => {
    const inputMoney = 10000;

    cy.get('#money-input').type(inputMoney);
    cy.get('#money-form button').click();
    cy.get('#money-form #money-amount').should('have.text', `${inputMoney}`);

    cy.get('#return-coin-button').click();

    cy.get('#toast').should('have.text', ERROR_MSG.MACHINE_DONT_HAVE_MONEY);
  });
});
