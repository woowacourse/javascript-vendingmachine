import { CHARGE_MONEY, ERROR_MESSAGE } from '../../src/ts/constants';

describe('잔돈 충전 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.changeTab('coins');
  });

  it(`${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원 이내의 금액을 잔돈으로 충전할 수 있다.`, () => {
    const chargeMoney = 5000;

    cy.chargeCoins(chargeMoney);

    cy.get('.charge-form-section__total-coin').should('have.text', chargeMoney);
  });

  it(`${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원 이내라면 기존 금액에 추가로 잔돈을 충전할 수 있다.`, () => {
    const chargeMoney = 5000;
    const chargeMoney2 = 50000;

    cy.chargeCoins(chargeMoney);
    cy.chargeCoins(chargeMoney2);

    cy.get('.charge-form-section__total-coin').should(
      'have.text',
      chargeMoney + chargeMoney2
    );
  });

  it(`누적 금액이 ${CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY}원을 초과하면 에러 메시지를 보여준다.`, () => {
    const chargeMoney = 100000;
    const overMaxChargeMoney = 100;

    cy.chargeCoins(chargeMoney);
    cy.chargeCoins(overMaxChargeMoney).then(() => {
      cy.checkErrorMessage(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY);
    });
  });
});
