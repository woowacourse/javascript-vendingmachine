describe("자판기 앱 구매 테스트", () => {
  beforeEach(() => {
    cy.visit("dist/index.html");

    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();

    cy.get(".product-management-button").click();
    cy.get("product-manage")
      .shadow()
      .find("product-input")
      .shadow()
      .find("#product-name-input")
      .type("콜라");
    cy.get("product-manage")
      .shadow()
      .find("product-input")
      .shadow()
      .find("#product-price-input")
      .type(2000);
    cy.get("product-manage")
      .shadow()
      .find("product-input")
      .shadow()
      .find("#product-count-input")
      .type(2);

    cy.get("product-manage")
      .shadow()
      .find("product-input")
      .shadow()
      .find("#add-product-button")
      .click();

    cy.get("login-status").shadow().find("#user-profile").click();
    cy.get("login-status").shadow().find("#logout-button").click();
  });

  it("금액을 충전할수 있다.", () => {
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#amount-input")
      .type("5000");
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#charge-amount-button")
      .click();

    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#have-amount")
      .should("have.text", "투입된 금액: 5000원");
  });

  it("상품을 구매할수 있다.", () => {
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#amount-input")
      .type("5000");
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#charge-amount-button")
      .click();

    cy.get("product-purchase")
      .shadow()
      .find("product-purchase-table")
      .shadow()
      .find(".process-button")
      .click();

    cy.get("product-purchase")
      .shadow()
      .find("product-purchase-table")
      .shadow()
      .find("tr")
      .find("#item-count")
      .should("have.text", "1");
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#have-amount")
      .should("have.text", "투입된 금액: 3000원");
  });

  it("잔액이 부족할시 에러 스낵바를 보여준다.", () => {
    cy.get("product-purchase")
      .shadow()
      .find("product-purchase-table")
      .shadow()
      .find(".process-button")
      .click();
    cy.get("page-by-login")
      .find("#snackbar")
      .should("have.text", "잔액이 부족합니다");
  });

  it("수량이 없을경우 에러 스낵바를 보여준다", () => {
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#amount-input")
      .type("8000");
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#charge-amount-button")
      .click();

    const product = cy
      .get("product-purchase")
      .shadow()
      .find("product-purchase-table")
      .shadow()
      .find(".process-button");

    product.click();
    product.click();
    product.click();

    cy.get("page-by-login")
      .find("#snackbar")
      .should("have.text", "상품의 재고가 없습니다");
  });
});

describe("자판기 반환 테스트", () => {
  beforeEach(() => {
    cy.get("login-status").click();
    cy.get("#login-email-input").type("hwangstar123@gmail.com");
    cy.get("#login-password-input").type("aldald1");

    cy.get(".login-button").click();
    cy.get(".changes-charge-button").click();

    cy.get("changes-manage")
      .shadow()
      .find("changes-input")
      .shadow()
      .find("#changes-input")
      .type(5000);
    cy.get("changes-manage")
      .shadow()
      .find("changes-input")
      .shadow()
      .find("#charge-changes-button")
      .click();

    cy.get("login-status").shadow().find("#user-profile").click();
    cy.get("login-status").shadow().find("#logout-button").click();
  });

  it("상품을 반환할수 있다", () => {
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#amount-input")
      .type(6000);
    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#charge-amount-button")
      .click();

    cy.get("product-purchase")
      .shadow()
      .find("return-table")
      .shadow()
      .find("#return-button")
      .click();

    cy.get("product-purchase")
      .shadow()
      .find("amount-input")
      .shadow()
      .find("#have-amount")
      .should("have.text", "투입된 금액: 1000원");
  });
});
