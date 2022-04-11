describe('잔돈을 충전할 수 있다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.get('#recharge-change-tab').click();
  });

  it('금액을 입력하면 동전들이 자판기에 생성된다.', () => {
    const changeInput = 1000;
    cy.rechargeChange(changeInput);
    cy.get('#recharge-coin-table span').then($els => {
      const [coin500, coin100, coin50, coin10] = [...$els].map(el => el.textContent);

      const expectedChangeInput =
        Number(coin500) * 500 + Number(coin100) * 100 + Number(coin50) * 50 + Number(coin10) * 10;

      expect(expectedChangeInput).to.equal(changeInput);
    });
  });
});
