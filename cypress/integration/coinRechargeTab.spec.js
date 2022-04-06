describe('잔돈 충전 탭 테스트', () => {
  const email = `${Math.random().toString(36).substring(3, 8)}@naaver.com`;
  const name = '김이박';
  const password = '1234!@#$asdf';
  const confirmPassword = '1234!@#$asdf';

  before(() => {
    cy.register(email, name, password, confirmPassword);
  });

  const cashInput = 1000;

  beforeEach(() => {
    cy.login(email, password);
    cy.get('#coin-recharge-tab-button').click();
  });

  it('금액을 입력하고 충전 버튼을 누르면 잔돈이 충전된다.', () => {
    cy.chargeCoin(cashInput);
    cy.get('#charged-amount').should('have.text', cashInput);
  });
});
