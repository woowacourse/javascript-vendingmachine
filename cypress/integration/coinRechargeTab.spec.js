describe('잔돈 충전 탭 테스트', () => {
  const email = 'a@naaver.com';
  const password = '1234!@#$asdf';

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
