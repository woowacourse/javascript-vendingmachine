describe("잔돈 테스트", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.get('[data-menu="#charge"]').click();
  });

  const chargeAmount = 1000;
  const purchaseAmount = 1500;

  it("금액을 투입하여 자판기 잔돈을 충전할 수 있다.", () => {
    cy.get(".charge-manage__input").type(chargeAmount);
    cy.get(".charge-manage__add-button").click();

    cy.get(".charge-manage__amount").contains(chargeAmount);
  });

  it("자판기가 보유한 금액만큼 잔돈을 반환할 수 있다.", () => {
    cy.get('[data-menu="#purchase"]').click();
    cy.addPurchaseAmount(purchaseAmount);
    cy.get(".return-coin__return-button").click();

    cy.get(".purchase-form__amount").contains(purchaseAmount - chargeAmount);
  });
});
