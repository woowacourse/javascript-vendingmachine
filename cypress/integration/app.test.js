const baseUrl = 'http://localhost:9000';

describe('핵심 기능 플로우 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  describe('상품 구매 플로우', () => {
    const defaultProduct = { name: '아메리카노', price: '2000', stock: '20' };
    beforeEach(() => {
      cy.get('#add-product-name-input').type(defaultProduct.name);
      cy.get('#add-product-price-input').type(defaultProduct.price);
      cy.get('#add-product-stock-input').type(defaultProduct.stock);
      cy.get('.submit-button').click();

      cy.get('#charge-tab-menu').click();
      cy.get('#money-input').type('5000');
      cy.get('.submit-button').click();

      cy.get('#purchase-tab-menu').click();
    });

    it('구매 탭으로 이동하면 등록한 상품을 확인할 수 있다.', () => {
      cy.get('.product-name').should('have.text', defaultProduct.name);
    });

    it('구매할 금액을 투입할 수 있다.', () => {
      cy.get('#money-insert-input').type('2000');
      cy.get('.submit-button').click();

      cy.get('#total-insert').should('have.text', '2000');
    });

    it('등록된 상품을 구매하면 투입 금액이 상품의 가격만큼 줄어든다.', () => {
      cy.get('#money-insert-input').type('2000');
      cy.get('.submit-button').click();

      cy.get('.purchase-product-button').first().click();

      cy.get('#total-insert').should('have.text', '0');
    });

    it('등록된 상품을 구매하면 상품의 재고가 1만큼 줄어든다.', () => {
      cy.get('#money-insert-input').type('2000');
      cy.get('.submit-button').click();

      cy.get('.purchase-product-button').first().click();

      cy.get('.product-stock').should('have.text', Number(defaultProduct.stock) - 1);
    });

    it('잔돈이 충분할 때 동전 반환 버튼을 클릭하면 충전된 잔돈이 남은 투입 금액만큼 감소한다.', () => {
      cy.get('#money-insert-input').type('2000');
      cy.get('.submit-button').click();

      cy.get('#return-change-button').click();

      cy.get('#charge-tab-menu').click();

      cy.get('#total-change').should('have.text', '3000');
    });
  });
});
