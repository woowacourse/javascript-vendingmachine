describe('금액 반환 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
    cy.login();
    cy.addProduct('콜라', 1500, 10);
    cy.get('#recharge-change-tab').click();
    cy.rechargeChange(15000);
    cy.get('#purchase-product-tab').click();
  });

  it('투입한 금액을 반환 받을 수 있다.', () => {
    const inputMoney = 10000;

    cy.get('#money-input').type(inputMoney);
    cy.get('#money-form button').click();
    cy.get('#money-form #money-amount').should('have.text', `${inputMoney}`);

    cy.get('#return-coin-button').click();

    cy.get('#return-coin-table span').then($els => {
      const [coin500, coin100, coin50, coin10] = [...$els].map(el => el.textContent);

      const expectedChangeInput =
        Number(coin500) * 500 + Number(coin100) * 100 + Number(coin50) * 50 + Number(coin10) * 10;

      expect(expectedChangeInput).to.equal(inputMoney);
    });
  });
});
