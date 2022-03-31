import { PRODUCT, CHARGE } from "../../src/ts/utils/constants";

describe("상품 관리 탭 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/#product");
    cy.get(".product-control-input").eq(0).as("productNameInput");
    cy.get(".product-control-input").eq(1).as("productPriceInput");
    cy.get(".product-control-input").eq(2).as("productQuantityInput");    
    cy.get("@productNameInput").type("사이다");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY);
    cy.get("#product-add-button").click();
  })

  it("자판기에 상품 추가가 기능하다", () => {    

    cy.get(".product-name").should("have.text", "사이다");
  });

  it("자판기에 상품을 수정할 수 있다", () => {
    cy.get(".product-edit-button").click();
    cy.get(".product-name").children().eq(0).type("사이다").clear().type("콜라");
    cy.get(".product-confirm-button").click();

    cy.get(".product-name").should("have.text", "콜라");
  });

  it("자판기에 상품을 제거할 수 있다", () => {
    cy.get(".product-remove-button").click();
    cy.on("window:confirm", (confirmText) => {
      expect(confirmText).eq("정말 삭제하시겠습니까?");
      return true;
    });

    cy.get("#product-control-table").children().eq(1).should("be.empty");
  });

  it("자판기에 같은 이름의 상품은 등록할 수 없다", () => {    
    cy.get("@productNameInput").type("사이다");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY);
    cy.get("#product-add-button").click();
    cy.get("#product-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq("중복된 상품명은 등록할 수 없습니다.");
    });
  });

  it(`자판기에 등록할 상품명은 ${PRODUCT.MAX_LENGTH}글자 까지 가능하다`, () => {
    cy.get("@productNameInput").type("사이다를마시다가용트름");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY);
    cy.get("#product-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`상품명은 최대 ${PRODUCT.MAX_LENGTH}글자까지 입력 가능합니다.`);
    });
  });

    it(`상품 가격은 ${PRODUCT.MIN_PRICE}원부터, 최대 ${PRODUCT.MAX_PRICE}원까지 가능하다.`, () => {
    cy.get("@productNameInput").type("콜라");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE + 1);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY);
    cy.get("#product-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`상품 가격은 ${PRODUCT.MIN_PRICE}원부터, 최대 ${PRODUCT.MAX_PRICE}원까지 가능합니다.`);
    });
  });

  it(`상품 가격은 ${PRODUCT.UNIT}원으로 나누어 떨어져야한다.`, () => {
    cy.get("@productNameInput").type("콜라");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE - 1);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY);
    cy.get("#product-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`상품 가격은 ${PRODUCT.UNIT}원으로 나누어 떨어져야합니다.`);
    });
  });

    it(`제품당 수량은 최소 ${PRODUCT.MAX_QUANTITY}개부터 최대 ${PRODUCT.MIN_QUANTITY}개까지 가능하다.`, () => {
    cy.get("@productNameInput").type("콜라");
    cy.get("@productPriceInput").type(PRODUCT.MAX_PRICE);
    cy.get("@productQuantityInput").type(PRODUCT.MAX_QUANTITY + 1);
    cy.get("#product-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`제품당 수량은 최소 ${PRODUCT.MAX_QUANTITY}개부터 최대 ${PRODUCT.MIN_QUANTITY}개까지 가능합니다.`);
    });
  });
});

describe("잔돈 관리 탭 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/#product");
    cy.get(".nav__button").eq(1).click();
    cy.get(".charge-coin-count").eq(3).as("TenWonCoinCountText");    
  });

  it("잔돈을 충전하면 500, 100, 50, 10 원 중에서 반환된다", () => {
    cy.get(".charge-control-input").type(40);
    cy.get("#charge-add-button").click();
    cy.get("@TenWonCoinCountText").should("have.text", "4개");
  })

  it(`최소 ${CHARGE.MIN_PRICE}원, 최대 ${CHARGE.MAX_PRICE}원까지 충전할 수 있다.`, () => {
    cy.get(".charge-control-input").type(CHARGE.MAX_PRICE + 1);
    cy.get("#charge-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`최소 ${CHARGE.MIN_PRICE}원, 최대 ${CHARGE.MAX_PRICE}원까지 충전할 수 있습니다.`);
    });
  })

    it(`잔돈은 ${CHARGE.UNIT}원으로 나누어 떨어지는 금액만 투입할 수 있다.`, () => {
    cy.get(".charge-control-input").type(CHARGE.UNIT + 1);
    cy.get("#charge-add-button").click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).eq(`잔돈은 ${CHARGE.UNIT}원으로 나누어 떨어지는 금액만 투입할 수 있습니다.`);
    });
  })

});