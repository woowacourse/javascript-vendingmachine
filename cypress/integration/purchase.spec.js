describe("상품 구매 테스트", () => {
  before(() => {
    cy.visit("/");
    cy.login();
  });

  it("금액을 투입하여 상품을 구매할 수 있다.", () => {
    const productName = "사과";
    const price = 1000;
    const quantity = 1;

    cy.get('[data-menu="#product"]').click();
    cy.addProduct(productName, price, quantity);

    cy.get('[data-menu="#purchase"]').click();
    cy.get(".purchase-form__input").type(price);
    cy.get(".purchase-form__add-button").click();
    cy.get(".purchase-table__purchase-button").eq(0).click();

    cy.get(".purchase-form__amount").contains(0);
  });
});
