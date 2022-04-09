describe("상품 관리 테스트", () => {
  before(() => {
    cy.visit("/");
    cy.login();
    cy.get('[data-menu="#product"]').click();
  });

  it("상품을 등록할 수 있다.", () => {
    const productName = "사과";
    const price = 1000;
    const quantity = 10;

    cy.addProduct(productName, price, quantity);
    cy.get(`[data-name=${productName}]`).should("be.visible");
  });

  it("상품을 수정할 수 있다.", () => {
    const productName = "포도";

    cy.get(".product-manage__edit-button").eq(0).click();
    cy.get(".product-manage__edit-input--name").clear();
    cy.get(".product-manage__edit-input--name").type(productName);
    cy.get(".product-manage__confirm-button").click();

    cy.get(`[data-name=${productName}]`).should("be.visible");
  });

  it("상품을 제거할 수 있다.", () => {
    cy.get(".product-manage__remove-button").click({ multiple: true });
    cy.get(".productmanage__table-body").children().should("have.length", 0);
  });
});
