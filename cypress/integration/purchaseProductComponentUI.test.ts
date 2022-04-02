// 상품 구매탭은 사용자가 금액을 투입할 수 있으며, 투입한 금액에 맞춰 상품을 구매하고, 남은 금액에 대해서는 잔돈을 반환하는 기능을 수행한다.

// - [ ] 사용자는 투입할 금액 입력 요소에 투입 금액을 입력한 후, 투입하기버튼을 이용하여 금액을 투입한다.
//   - [ ] 금액은 10원으로 나누어 떨어지는 금액만 투입할 수 있다.
//   - [ ] 최대 투입 금액은 10,000원이다.
// - [ ] 금액은 누적으로 투입할 수 있다.
// - [ ] 사용자는 반환하기 버튼을 통해 잔돈을 반환 받을 수 있다.
// - [ ] 잔돈 계산에 대해 아래의 규칙을 적용한다.
//   - 잔돈을 돌려줄 때는 현재 보유한 최소 개수의 동전으로 잔돈을 돌려준다.
//   - 지폐를 잔돈으로 반환하는 경우는 없다고 가정한다.
//   - 잔돈을 반환할 수 없는 경우 잔돈으로 반환할 수 있는 금액만 반환한다.
// - [ ] 사용자가 버튼을 클릭했을 때 해당 행위가 정상적으로 동작하거나, 실패하였음을 snackbar를 통해 보여준다.

/**
 * 초기 세팅하는 함수 따로 만들어서 빼고 시작할 때 실행 시켜주자.
 */

describe('상품 구매 하기 E2E 테스트', () => {
  before(() => {
    cy.visit('/');
  });

  it('사용자는 상품 구입을 위해 투입할 금액을 입력하고 투입 버튼을 클릭하면 해당하는 금액이 투입한 금액에 표시된다.', () => {
    cy.get('.nav__product-button').click();

    cy.get('.product-info-form__product-input').type('콜라');
    cy.get('.product-info-form__price-input').type('1200');
    cy.get('.product-info-form__quantity-input').type('12');
    cy.get('.product-info-form__add-button').click();

    cy.get('.nav__charge-button').click();
    cy.get('.charge-form-section__charge-money-input').type(5000);
    cy.get('.charge-form-section__button').click();

    // test케이스 수정 필요
    // cy.get('.coin-quantity').then((element) => {});

    cy.get('.nav__purchase-button').click();
    cy.get('.purchase-form-section__consumer-charge-money-input').type(5000);
    cy.get('.consumer-charge-money-form-section__button').click();

    cy.get(
      '.consumer-charge-money-form-section__total-consumer-charge-money'
    ).should('have.text', '5000');
  });

  it('사용자가 구매하고 싶은 상품의 구매 버튼을 클릭하면, 해당하는 상품의 가격만큼 투입한 금액이 차감되고, 해당하는 상품의 수량은 -1 된 수량이 표시된다.', () => {
    cy.get('.product-table__purchase-button').click();
    cy.get('.product-table__purchase-product-count').should(
      'have.text',
      '11개'
    );
  });

  it('사용자가 상품을 구매후 잔돈 반환하기 버튼을 클릭하면, 투입한 금액이 초기화 된다.', () => {
    cy.get('.return-coin-quantity-section__return-button').click();
    cy.get(
      '.consumer-charge-money-form-section__total-consumer-charge-money'
    ).should('have.text', 0);
  });
});
