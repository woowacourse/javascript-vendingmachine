import { ERROR_MSG } from '../../src/utils/constants';

describe('잔돈 충전 예외 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.get('#recharge-change-tab').click();
  });

  it('범위에 맞지 않는 금액을 충전할 시 에러 토스트를 보게된다.', () => {
    const invalidInput = 5;
    cy.get('#recharge-change-input').type(invalidInput);
    cy.get('#recharge-change-form button').click();
    cy.get('#toast').should('have.text', ERROR_MSG.CHANGE_OUT_OF_RANGE);
  });
});
