import { ERROR_MESSAGE, NOT_ENOUGH_CHANGE_MESSAGE } from '../../src/js/constants';

const baseUrl = 'http://localhost:9000';

describe('핵심 기능 플로우 테스트', () => {
  function createRandomUserData() {
    return { email: `${Date.now()}@test.com`, name: 'test', password: 'abcd1234!!' };
  }

  before(() => {
    cy.visit(baseUrl);
    cy.window()
      .then((win) => {
        win.sessionStorage.clear();
      })
      .then((win) => win.location.reload());
    const userData = createRandomUserData();
    cy.loginWithNewUser(userData);
  });

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  describe('상품 구매 플로우', () => {
    describe('기능 기본 테스트', () => {
      const defaultProduct = { name: '아메리카노', price: '2000', stock: '20' };
      const defaultChange = '5000';

      beforeEach(() => {
        cy.addProduct(defaultProduct);
        cy.addChange(defaultChange);

        cy.get('#purchase-tab-menu').click();
      });

      it('구매 탭으로 이동하면 등록한 상품을 확인할 수 있다.', () => {
        cy.get('.product-name').should('have.text', defaultProduct.name);
      });

      it('구매할 금액을 투입할 수 있다.', () => {
        // given
        const moneyInsert = '2000';

        // when
        cy.addMoneyInsert(moneyInsert);

        // then
        cy.get('#total-insert').should('have.text', moneyInsert);
      });

      it('등록된 상품을 구매하면 투입 금액이 상품의 가격만큼 줄어든다.', () => {
        // given
        const moneyInsert = '2000';
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('.purchase-product-button').first().click();

        // then
        cy.get('#total-insert').should(
          'have.text',
          Number(moneyInsert) - Number(defaultProduct.price)
        );
      });

      it('등록된 상품을 구매하면 상품의 재고가 1만큼 줄어든다.', () => {
        // given
        const moneyInsert = '2000';
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('.purchase-product-button').first().click();

        // then
        cy.get('.product-stock').should('have.text', Number(defaultProduct.stock) - 1);
      });

      it('잔돈이 충분할 때 동전 반환 버튼을 클릭하면 충전된 잔돈이 남은 투입 금액만큼 감소한다.', () => {
        // given
        const moneyInsert = '2000';
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('#return-change-button').click();

        // then
        cy.get('#charge-tab-menu').click();
        cy.get('#total-change').should(
          'have.text',
          Number(defaultChange) - Number(moneyInsert)
        );
      });

      it('잔돈이 충분할 때 동전 반환 버튼을 클릭하면 남은 투입 금액이 0이 된다.', () => {
        // given
        const moneyInsert = '2000';
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('#return-change-button').click();

        // then
        cy.get('#total-insert').should('have.text', '0');
      });
    });

    describe('기능 디테일 테스트', () => {
      beforeEach(() => {
        cy.visit(baseUrl);
      });

      it('금액을 누적해서 투입할 수 있다.', () => {
        // given
        const firstMoneyInsert = '2000';
        const secondMoneyInsert = '1000';
        cy.get('#purchase-tab-menu').click();

        // when
        cy.addMoneyInsert(firstMoneyInsert);
        cy.addMoneyInsert(secondMoneyInsert);

        // then
        cy.get('#total-insert').should(
          'have.text',
          Number(firstMoneyInsert) + Number(secondMoneyInsert)
        );
      });

      it('재고가 1개인 상품을 구매하면 목록에서 상품이 사라진다.', () => {
        // given
        const singleStockProductData = { name: '아메리카노', price: '2000', stock: '1' };
        cy.addProduct(singleStockProductData);
        cy.addMoneyInsert(singleStockProductData.price);

        // when
        cy.get('.purchase-product-button').first().click();

        // then
        cy.get('.product-name').should('not.exist');
      });

      it('반환할 잔돈이 충분하지 않으면 잔돈 반환 클릭 시 보유한 모든 잔돈을 반환한다.', () => {
        // given
        const change = '1000';
        const moneyInsert = '2000';

        cy.addChange(change);
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('#return-change-button').click();

        // then
        cy.get('#charge-tab-menu').click();
        cy.get('#total-change').should('have.text', '0');
      });

      it('반환할 잔돈이 충분하지 않으면 잔돈 반환 클릭 시 남은 투입 금액이 반환한 잔돈만큼 감소한다.', () => {
        // given
        const change = '1000';
        const moneyInsert = '2000';

        cy.addChange(change);
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('#return-change-button').click();

        // then
        cy.get('#total-insert').should('have.text', Number(moneyInsert) - Number(change));
      });

      it('상품을 구매한 뒤 상품 관리 탭으로 이동하면 갱신된 상품 정보가 표시된다.', () => {
        // given
        const initialProductData = { name: '아메리카노', price: '2000', stock: '5' };
        const moneyInsert = initialProductData.price;

        cy.addProduct(initialProductData);
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('.purchase-product-button').first().click();

        // then
        cy.get('#manage-tab-menu').click();
        cy.get('.product-stock')
          .first()
          .should('have.text', Number(initialProductData.stock) - 1);
      });

      it('상품 관리 탭에서 정보를 수정하면 상품 구매 탭에서 갱신된 상품 정보가 표시된다.', () => {
        // given
        const initialProductData = { name: '아메리카노', price: '2000', stock: '5' };
        const targetUpdateProperty = 'price';
        const newData = '3000';

        cy.addProduct(initialProductData);

        // when
        cy.get('#purchase-tab-menu').click();

        cy.updateProduct(targetUpdateProperty, newData);

        // then
        cy.get('#purchase-tab-menu').click();
        cy.get('.product-price').first().should('have.text', newData);
      });
    });

    describe('예외 처리 테스트', () => {
      it('10원 이하의 금액을 투입하면 투입에 실패해야 한다.', () => {
        // given
        const smallInput = '9';

        // when
        cy.addMoneyInsert(smallInput);

        // then
        cy.get('#total-insert').should('have.text', '0');
      });

      it('10000원 이상의 금액을 투입하면 투입에 실패해야 한다.', () => {
        // given
        const largeInput = '10010';

        // when
        cy.addMoneyInsert(largeInput);

        // then
        cy.get('#total-insert').should('have.text', '0');
      });

      it('10원 단위가 아닌 금액을 투입하면 투입에 실패해야 한다.', () => {
        // given
        const invalidInput = '11';

        // when
        cy.addMoneyInsert(invalidInput);

        // then
        cy.get('#total-insert').should('have.text', '0');
      });

      it('기존 투입 금액과 현재 투입 금액의 합이 10000원을 초과하면 투입에 실패해야 한다.', () => {
        // given
        const firstMoneyInsert = '10000';
        const secondMoneyInsert = '10';
        cy.addMoneyInsert(firstMoneyInsert);

        // when
        cy.addMoneyInsert(secondMoneyInsert);

        // then
        cy.get('#total-insert').should('have.text', firstMoneyInsert);
      });

      it('투입 금액이 0일 때 잔돈 반환 클릭 시 스낵바에 오류가 표시된다.', () => {
        // when
        cy.get('#purchase-tab-menu').click();
        cy.get('#return-change-button').click();

        // then
        cy.get('.snackbar').should(
          'have.text',
          ERROR_MESSAGE.RETURN_CHANGE.NO_MONEY_INSERT
        );
      });

      it('반환할 잔돈이 부족할 때 잔돈을 반환하면 스낵바에 오류가 표시된다.', () => {
        // given
        const moneyInsert = '10000';
        cy.addMoneyInsert(moneyInsert);

        // when
        cy.get('#return-change-button').click();

        // then
        cy.get('.snackbar').should('have.text', NOT_ENOUGH_CHANGE_MESSAGE);
      });
    });
  });
});
