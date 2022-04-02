import { ERROR_MESSAGE } from '../../src/js/constants';

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

    it('잔돈이 충분할 때 동전 반환 버튼을 클릭하면 남은 투입 금액이 0이 된다.', () => {
      cy.get('#money-insert-input').type('2000');
      cy.get('.submit-button').click();

      cy.get('#return-change-button').click();

      cy.get('#total-insert').should('have.text', '0');
    });
  });
});

describe('기능 디테일 테스트', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('금액을 누적해서 투입할 수 있다.', () => {
    const firstMoneyInsert = '2000';
    const secondMoneyInsert = '1000';
    cy.get('#purchase-tab-menu').click();

    cy.get('#money-insert-input').type(firstMoneyInsert);
    cy.get('.submit-button').click();

    cy.get('#money-insert-input').type(secondMoneyInsert);
    cy.get('.submit-button').click();

    cy.get('#total-insert').should(
      'have.text',
      Number(firstMoneyInsert) + Number(secondMoneyInsert)
    );
  });

  it('재고가 1개인 상품을 구매하면 목록에서 상품이 사라진다.', () => {
    cy.get('#add-product-name-input').type('재고 1개');
    cy.get('#add-product-price-input').type('1000');
    cy.get('#add-product-stock-input').type('1');
    cy.get('.submit-button').click();

    cy.get('#purchase-tab-menu').click();

    cy.get('#money-insert-input').type('2000');
    cy.get('.submit-button').click();

    cy.get('.purchase-product-button').first().click();

    cy.get('.product-name').should('not.exist');
  });

  it('반환할 잔돈이 충분하지 않으면 잔돈 반환 클릭 시 보유한 모든 잔돈을 반환한다.', () => {
    cy.get('#charge-tab-menu').click();
    cy.get('#money-input').type('3000');
    cy.get('.submit-button').click();

    cy.get('#purchase-tab-menu').click();
    cy.get('#money-insert-input').type('5000');
    cy.get('.submit-button').click();

    cy.get('#return-change-button').click();

    cy.get('#charge-tab-menu').click();
    cy.get('#total-change').should('have.text', '0');
  });

  it('반환할 잔돈이 충분하지 않으면 잔돈 반환 클릭 시 남은 투입 금액이 반환한 잔돈만큼 감소한다.', () => {
    cy.get('#charge-tab-menu').click();
    cy.get('#money-input').type('1000');
    cy.get('.submit-button').click();

    cy.get('#purchase-tab-menu').click();
    cy.get('#money-insert-input').type('2000');
    cy.get('.submit-button').click();

    cy.get('#return-change-button').click();

    cy.get('#total-insert').should('have.text', '1000');
  });

  it.only('투입 금액이 0일 때 잔돈 반환 클릭 시 스낵바로 오류를 표시한다.', () => {
    cy.get('#purchase-tab-menu').click();
    cy.get('#return-change-button').click();

    cy.get('.snackbar').should('have.text', ERROR_MESSAGE.RETURN_CHANGE.NO_MONEY_INSERT);
  });
});
