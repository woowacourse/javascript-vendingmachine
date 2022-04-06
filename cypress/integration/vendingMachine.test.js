import { ERROR_MESSAGE } from '../../src/js/constants';

describe('상품 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    const email = 'test123@naver.com';
    const password = 'Abc1234!';
    cy.login(email, password);
  });

  describe('상품 추가 테스트', () => {
    beforeEach(() => {
      cy.get('#manage-tab-menu').click();
    });

    it('상품을 추가할 수 있다.', () => {
      cy.addProduct('콜라', 400, 3);
      cy.get('.product-name').should('have.length', 1);
    });

    it('10글자를 초과한 상품일 경우 에러가 발생한다.', () => {
      cy.addProduct('콜라콜라콜라콜라콜라콜', 400, 3);

      cy.get('#snackbar').should(
        'have.text',
        ERROR_MESSAGE.EXCEED_MAX_PRODUCT_NAME_LENGTH
      );
    });

    it('상품가격이 100원 이하일 경우 에러메시지가 발생한다.', () => {
      cy.addProduct('콜라', 10, 3);

      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE);
    });

    it('상품가격이 10000원 초과할 경우 에러메시지가 발생한다.', () => {
      cy.addProduct('콜라', 100000, 3);

      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.OUT_OF_PRODUCT_PRICE_RANGE);
    });

    it('상품가격이 10원으로 나누어 떨어지지 않을 경우 에러메시지가 발생한다.', () => {
      cy.addProduct('콜라', 109, 3);

      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.INVALID_UNIT_PRODUCT_PRICE);
    });

    it('동일한 이름의 상품을 추가할 경우 에러메시지가 발생한다.', () => {
      cy.addProduct('콜라', 200, 3);
      cy.addProduct('콜라', 400, 4);

      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.DUPLICATE_PRODUCT_NAME);
    });
  });

  describe('잔돈 충전 테스트', () => {
    beforeEach(() => {
      cy.get('#charge-tab-menu').click();
    });

    it('잔돈을 충전할 수 있다.', () => {
      cy.addChange(4000);
      cy.get('#total-change').should('have.text', 4000);
    });

    it('잔돈을 누적해서 충전할 수 있다.', () => {
      cy.addChange(4000);
      cy.addChange(5000);
      cy.get('#total-change').should('have.text', 9000);
    });

    it('잔돈이 10원 단위가 아닐 경우 에러메시지가 발생한다..', () => {
      cy.addChange(11);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.INVALID_UNIT_CHANGE);
    });

    it('잔돈이 100,000원을 초과한 경우 에러메시지가 발생한다..', () => {
      cy.addChange(50000);
      cy.addChange(50010);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.EXCEED_MAX_TOTAL_CHANGE);
    });
  });

  describe('상품 구매 테스트', () => {
    beforeEach(() => {
      cy.get('#manage-tab-menu').click();
      cy.addProduct('콜라', 400, 3);
      cy.get('#charge-tab-menu').click();
      cy.addChange(4000);
      cy.get('#purchase-tab-menu').click();
    });

    it('금액을 충전한 뒤 상품을 구매하면 해당 상품의 가격만큼 금액이 줄어든다.', () => {
      cy.inputMoney(3000);
      cy.get('.purchase-product-button').click();
      cy.get('#total-money').should('have.text', 2600);
    });

    it('금액을 충전한 뒤 상품을 구매하면 해당 상품의 수량이 줄어든다.', () => {
      cy.inputMoney(3000);
      cy.get('.purchase-product-button').click();
      cy.get('.product-stock').should('have.text', 2);
    });

    it('금액은 누적 충전이 가능하다.', () => {
      cy.inputMoney(3000);
      cy.inputMoney(3000);

      cy.get('#total-money').should('have.text', 6000);
    });

    it('금액은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.', () => {
      cy.inputMoney(11);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.INVALID_UNIT_MONEY);
    });

    it('총 금액은 10000원을 넘게 투입할 수 없다..', () => {
      cy.inputMoney(10010);
      cy.get('#snackbar').should('have.text', ERROR_MESSAGE.EXCEED_MAX_TOTAL_MONEY);
    });
  });
});
